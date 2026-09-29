using System.IO.Compression;
using RoslynSense.API.Interfaces;
using RoslynSense.API.Models.Responses;
using RoslynSense.API.Options;
using Microsoft.Extensions.Options;

namespace RoslynSense.API.Services;

public sealed class UploadService(
    IOptions<UploadOptions> uploadOptions,
    IOptions<WorkspaceOptions> workspaceOptions,
    IWebHostEnvironment hostEnvironment) : IUploadService
{
    public async Task<UploadProjectResponse> UploadProjectAsync(
        IFormFile? file,
        CancellationToken cancellationToken = default)
    {
        ValidateFile(file);

        var scanId = Guid.NewGuid();
        var workspaceRoot = Path.GetFullPath(workspaceOptions.Value.RootPath, hostEnvironment.ContentRootPath);
        var workspacePath = Path.Combine(workspaceRoot, scanId.ToString("N"));
        var archivePath = Path.Combine(workspacePath, "project.zip");

        Directory.CreateDirectory(workspacePath);

        try
        {
            await using (var archiveStream = File.Create(archivePath))
            {
                await file!.CopyToAsync(archiveStream, cancellationToken);
            }

            ExtractArchive(archivePath, workspacePath, cancellationToken);

            return new UploadProjectResponse
            {
                ScanId = scanId,
                WorkspacePath = workspacePath
            };
        }
        catch
        {
            if (Directory.Exists(workspacePath))
            {
                Directory.Delete(workspacePath, recursive: true);
            }

            throw;
        }
        finally
        {
            if (File.Exists(archivePath))
            {
                File.Delete(archivePath);
            }
        }
    }

    private void ValidateFile(IFormFile? file)
    {
        if (file is null || file.Length == 0)
        {
            throw new ArgumentException("A non-empty ZIP file is required.");
        }

        if (!string.Equals(Path.GetExtension(file.FileName), ".zip", StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException("Only .zip files are supported.");
        }

        if (file.Length > uploadOptions.Value.MaxFileSizeBytes)
        {
            throw new ArgumentException($"The uploaded file exceeds the {uploadOptions.Value.MaxFileSizeBytes} byte limit.");
        }
    }

    private static void ExtractArchive(string archivePath, string workspacePath, CancellationToken cancellationToken)
    {
        var workspacePrefix = Path.EndsInDirectorySeparator(workspacePath)
            ? workspacePath
            : workspacePath + Path.DirectorySeparatorChar;

        using var archive = ZipFile.OpenRead(archivePath);
        foreach (var entry in archive.Entries)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var destinationPath = Path.GetFullPath(Path.Combine(workspacePath, entry.FullName));
            if (!destinationPath.StartsWith(workspacePrefix, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidDataException("The ZIP archive contains an entry outside the workspace.");
            }

            if (string.IsNullOrEmpty(entry.Name))
            {
                Directory.CreateDirectory(destinationPath);
                continue;
            }

            Directory.CreateDirectory(Path.GetDirectoryName(destinationPath)!);
            entry.ExtractToFile(destinationPath, overwrite: false);
        }
    }
}
