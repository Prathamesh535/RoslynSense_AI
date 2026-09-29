using CodeGuard.API.Models.Internal;

namespace CodeGuard.API.Models.Responses;

public sealed class AnalyzeFileResponse
{
    public FileAnalysisResult Analysis { get; init; } = new();
}