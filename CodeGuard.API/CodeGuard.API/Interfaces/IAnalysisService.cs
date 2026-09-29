using CodeGuard.API.Models.Internal;
using CodeGuard.API.Models.Requests;

namespace CodeGuard.API.Interfaces;

public interface IAnalysisService
{
    Task<FileAnalysisResult> AnalyzePasteAsync(
        PasteCodeRequest request,
        CancellationToken cancellationToken = default);

    Task<FileAnalysisResult> AnalyzeFileAsync(
        IFormFile file,
        string provider,
        string model,
        double temperature,
        int maxTokens,
        CancellationToken cancellationToken = default);
}