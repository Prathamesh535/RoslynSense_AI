namespace RoslynSense.API.Models.Internal;

public sealed class SourceFile
{
    public string FileName { get; init; } = string.Empty;
    public string RelativePath { get; init; } = string.Empty;
    public string Extension { get; init; } = string.Empty;
    public string Language { get; init; } = string.Empty;
    public long FileSize { get; init; }
}
