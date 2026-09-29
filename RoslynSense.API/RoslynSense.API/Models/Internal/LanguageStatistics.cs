namespace RoslynSense.API.Models.Internal;

public sealed class LanguageStatistics
{
    public string Language { get; init; } = string.Empty;
    public int FileCount { get; init; }
    public long TotalFileSize { get; init; }
}
