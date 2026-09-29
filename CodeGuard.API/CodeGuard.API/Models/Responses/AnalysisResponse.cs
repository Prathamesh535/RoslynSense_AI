using CodeGuard.API.Models.Internal;

namespace CodeGuard.API.Models.Responses;

public sealed class AnalysisResponse
{
    public string FileName { get; init; } = "";

    public SyntaxAnalysisResult? SyntaxAnalysis { get; init; }

    public IReadOnlyList<DiagnosticItem> Diagnostics { get; init; } = [];

    public AIReviewResult? AIReview { get; init; }
}