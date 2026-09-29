using RoslynSense.API.Models.Internal;

namespace RoslynSense.API.Models.Responses;

public sealed class AnalyzeFileResponse
{
    public FileAnalysisResult Analysis { get; init; } = new();
}