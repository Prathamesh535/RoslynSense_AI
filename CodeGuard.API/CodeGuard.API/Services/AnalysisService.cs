using CodeGuard.API.Interfaces;
using CodeGuard.API.Models.Internal;
using CodeGuard.API.Models.Requests;

namespace CodeGuard.API.Services;

public sealed class AnalysisService(
    IRoslynAnalyzer roslynAnalyzer,
    IAIReviewService aiReviewService)
    : IAnalysisService
{
    //public async Task<FileAnalysisResult> AnalyzePasteAsync(
    //    PasteCodeRequest request,
    //    CancellationToken cancellationToken = default)
    //{
    //    cancellationToken.ThrowIfCancellationRequested();

    //    var analysis = roslynAnalyzer.AnalyzeSourceCode(
    //        "PastedFile.cs",
    //        request.Code);

    //    var aiReview = await aiReviewService.ReviewAsync(
    //        new AIReviewRequest
    //        {
    //            Provider = request.Provider,
    //            Model = request.Model,
    //            Temperature = request.Temperature,
    //            MaxTokens = request.MaxTokens,

    //            FileName = "PastedFile.cs",
    //            SourceCode = request.Code,

    //            RuleId = "",
    //            DiagnosticMessage = "",
    //            LineNumber = 0,
    //            RoslynAnalysis = ""
    //        },
    //        cancellationToken);

    //    return new FileAnalysisResult
    //    {
    //        FileName = analysis.FileName,
    //        RelativePath = analysis.RelativePath,
    //        SyntaxAnalysis = analysis.SyntaxAnalysis,
    //        Diagnostics = analysis.Diagnostics,
    //        SyntaxErrors = analysis.SyntaxErrors,
    //        AIReviewResult = aiReview
    //    };
    //}
    public async Task<FileAnalysisResult> AnalyzePasteAsync(
    PasteCodeRequest request,
    CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var analysis = roslynAnalyzer.AnalyzeSourceCode(
            "PastedFile.cs",
            request.Code);

        return new FileAnalysisResult
        {
            FileName = analysis.FileName,
            RelativePath = analysis.RelativePath,
            SyntaxAnalysis = analysis.SyntaxAnalysis,
            Diagnostics = analysis.Diagnostics,
            SyntaxErrors = analysis.SyntaxErrors,

            // No AI review during Analyze
            AIReviewResult = null
        };
    }

    public async Task<FileAnalysisResult> AnalyzeFileAsync(
        IFormFile file,
        string provider,
        string model,
        double temperature,
        int maxTokens,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        using var reader = new StreamReader(file.OpenReadStream());

        var sourceCode = await reader.ReadToEndAsync(cancellationToken);

        var analysis = roslynAnalyzer.AnalyzeSourceCode(
            file.FileName,
            sourceCode);

        var aiReview = await aiReviewService.ReviewAsync(
            new AIReviewRequest
            {
                Provider = provider,
                Model = model,
                Temperature = temperature,
                MaxTokens = maxTokens,

                FileName = file.FileName,
                SourceCode = sourceCode,

                RuleId = "",
                DiagnosticMessage = "",
                LineNumber = 0,
                RoslynAnalysis = ""
            },
            cancellationToken);

        return new FileAnalysisResult
        {
            FileName = analysis.FileName,
            RelativePath = analysis.RelativePath,
            SyntaxAnalysis = analysis.SyntaxAnalysis,
            Diagnostics = analysis.Diagnostics,
            SyntaxErrors = analysis.SyntaxErrors,
            AIReviewResult = aiReview
        };
    }
}