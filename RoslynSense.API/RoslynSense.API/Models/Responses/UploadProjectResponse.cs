using RoslynSense.API.Models.Internal;

namespace RoslynSense.API.Models.Responses;

public sealed class UploadProjectResponse
{
    public Guid ScanId { get; init; }
    public string WorkspacePath { get; init; } = string.Empty;
    public ProjectScanResult? ProjectScanResult { get; init; }
    public IReadOnlyList<FileAnalysisResult> FileAnalysisResults { get; init; } = Array.Empty<FileAnalysisResult>();
    public AIReviewResult? AIReviewResult { get; init; }
    public SyntaxAnalysisResult OverallSyntaxAnalysis { get; init; } = new();
}
