using CodeGuard.API.Models.Responses;

namespace CodeGuard.API.Interfaces;

public interface IFileAnalysisService
{
    Task<AnalyzeFileResponse> AnalyzeAsync(
        string fileName,
        string language,
        string sourceCode,
        CancellationToken cancellationToken);
}