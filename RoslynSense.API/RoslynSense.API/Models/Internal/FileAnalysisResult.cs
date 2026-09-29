namespace RoslynSense.API.Models.Internal;

public sealed class FileAnalysisResult
{
    public string FileName { get; init; } = string.Empty;

    public string RelativePath { get; init; } = string.Empty;

    public SyntaxAnalysisResult? SyntaxAnalysis { get; init; }

    public AIReviewResult? AIReviewResult { get; init; }

    public IReadOnlyList<DiagnosticItem> Diagnostics { get; init; }
        = Array.Empty<DiagnosticItem>();

    public IReadOnlyList<DiagnosticItem> SyntaxErrors { get; init; }
        = Array.Empty<DiagnosticItem>();
}
