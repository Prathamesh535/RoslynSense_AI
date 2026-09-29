namespace RoslynSense.API.Models.Internal;

public sealed class ProjectScanResult
{
    public Guid ScanId { get; init; }
    public string ProjectName { get; init; } = string.Empty;
    public string? SolutionName { get; init; }
    public int TotalFiles { get; init; }
    public int TotalFolders { get; init; }
    public IReadOnlyList<LanguageStatistics> LanguageStatistics { get; init; } = Array.Empty<LanguageStatistics>();
    public IReadOnlyList<SourceFile> SourceFiles { get; init; } = Array.Empty<SourceFile>();
}
