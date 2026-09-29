using RoslynSense.API.Models.Responses;

namespace RoslynSense.API.Interfaces;

public interface IFileAnalysisService
{
    Task<AnalyzeFileResponse> AnalyzeAsync(
        string fileName,
        string language,
        string sourceCode,
        CancellationToken cancellationToken);
}