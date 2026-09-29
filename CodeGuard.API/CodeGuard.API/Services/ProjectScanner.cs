using CodeGuard.API.Interfaces;
using CodeGuard.API.Models.Internal;

namespace CodeGuard.API.Services;

public sealed class ProjectScanner : IProjectScanner
{
    private static readonly HashSet<string> IgnoredDirectoryNames = new(StringComparer.OrdinalIgnoreCase)
    {
        "bin", "obj", ".git", "node_modules", ".vs", "packages"
    };

    private static readonly IReadOnlyDictionary<string, string> SupportedExtensions =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            [".cs"] = "C#",
            [".csproj"] = "C# Project",
            [".sln"] = "Solution",
            [".js"] = "JavaScript",
            [".jsx"] = "JavaScript",
            [".ts"] = "TypeScript",
            [".tsx"] = "TypeScript",
            [".html"] = "HTML",
            [".css"] = "CSS",
            [".sql"] = "SQL",
            [".json"] = "JSON",
            [".cshtml"] = "Razor"
        };

    public ProjectScanResult Scan(Guid scanId, string workspacePath, CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(workspacePath);

        var rootPath = Path.GetFullPath(workspacePath);
        if (!Directory.Exists(rootPath))
        {
            throw new DirectoryNotFoundException($"Workspace '{rootPath}' does not exist.");
        }

        var sourceFiles = new List<SourceFile>();
        var directories = new Stack<string>();
        directories.Push(rootPath);
        var totalFolders = 0;

        while (directories.Count > 0)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var currentDirectory = directories.Pop();

            foreach (var directory in Directory.EnumerateDirectories(currentDirectory))
            {
                cancellationToken.ThrowIfCancellationRequested();
                if (IgnoredDirectoryNames.Contains(Path.GetFileName(directory)))
                {
                    continue;
                }

                totalFolders++;
                directories.Push(directory);
            }

            foreach (var filePath in Directory.EnumerateFiles(currentDirectory))
            {
                cancellationToken.ThrowIfCancellationRequested();
                var extension = Path.GetExtension(filePath);
                if (!SupportedExtensions.TryGetValue(extension, out var language))
                {
                    continue;
                }

                var fileInfo = new FileInfo(filePath);
                sourceFiles.Add(new SourceFile
                {
                    FileName = fileInfo.Name,
                    RelativePath = Path.GetRelativePath(rootPath, filePath),
                    Extension = extension,
                    Language = language,
                    FileSize = fileInfo.Length
                });
            }
        }

        var orderedFiles = sourceFiles
            .OrderBy(file => file.RelativePath, StringComparer.OrdinalIgnoreCase)
            .ToArray();

        return new ProjectScanResult
        {
            ScanId = scanId,
            ProjectName = ResolveProjectName(orderedFiles, rootPath),
            SolutionName = orderedFiles
                .FirstOrDefault(file => string.Equals(file.Extension, ".sln", StringComparison.OrdinalIgnoreCase))
                ?.FileName,
            TotalFiles = orderedFiles.Length,
            TotalFolders = totalFolders,
            LanguageStatistics = orderedFiles
                .GroupBy(file => file.Language, StringComparer.OrdinalIgnoreCase)
                .OrderBy(group => group.Key, StringComparer.OrdinalIgnoreCase)
                .Select(group => new LanguageStatistics
                {
                    Language = group.Key,
                    FileCount = group.Count(),
                    TotalFileSize = group.Sum(file => file.FileSize)
                })
                .ToArray(),
            SourceFiles = orderedFiles
        };
    }

    private static string ResolveProjectName(IReadOnlyList<SourceFile> sourceFiles, string workspacePath)
    {
        var projectFile = sourceFiles.FirstOrDefault(file =>
            string.Equals(file.Extension, ".csproj", StringComparison.OrdinalIgnoreCase));

        return projectFile is not null
            ? Path.GetFileNameWithoutExtension(projectFile.FileName)
            : Path.GetFileName(workspacePath.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar));
    }
}
