using RoslynSense.API.Models.Internal;
using RoslynSense.API.Models.Requests;

namespace RoslynSense.API.Interfaces;

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