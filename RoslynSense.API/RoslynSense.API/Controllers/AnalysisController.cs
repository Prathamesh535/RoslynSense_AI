using RoslynSense.API.Interfaces;
using RoslynSense.API.Models.Common;
using RoslynSense.API.Models.Internal;
using RoslynSense.API.Models.Requests;
using RoslynSense.API.Models.Responses;
using RoslynSense.API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace RoslynSense.API.Controllers;

[ApiController]
[Route("api/analysis")]
public sealed class AnalysisController(
    IAnalysisService analysisService,
    IAIReviewService aiReviewService) : ControllerBase

{
    [HttpPost("file")]
    [ProducesResponseType(typeof(ApiResponse<AnalyzeFileResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<AnalyzeFileResponse>), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiResponse<AnalyzeFileResponse>>> AnalyzeFile(
    [FromBody] AnalyzeFileRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(
                ApiResponse<AnalyzeFileResponse>.Fail(
                    "Invalid request."));
        }

        if (!string.Equals(
                request.Language,
                "csharp",
                StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(
                ApiResponse<AnalyzeFileResponse>.Fail(
                    "Only C# is currently supported."));
        }

        var result = await analysisService.AnalyzePasteAsync(
            new PasteCodeRequest
            {
                Code = request.SourceCode,
                Provider = request.Provider,
                Model = request.Model,
                Temperature = request.Temperature,
                MaxTokens = request.MaxTokens,
                FileName = request.FileName,
            });
        Console.WriteLine("===== AI REQUEST =====");
        Console.WriteLine($"Provider: {request.Provider}");
        Console.WriteLine($"Model: {request.Model}");
        Console.WriteLine($"Temp: {request.Temperature}");
        Console.WriteLine($"Tokens: {request.MaxTokens}");
        var response = new AnalyzeFileResponse
        {
            Analysis = result
        };

        return Ok(
            ApiResponse<AnalyzeFileResponse>.Ok(
                response,
                "Analysis completed successfully."));
    }

    [HttpPost("ai-fix")]
    [ProducesResponseType(typeof(ApiResponse<AIReviewResult>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<AIReviewResult>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiResponse<AIReviewResult>), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ApiResponse<AIReviewResult>>> GetAIFix(
    [FromBody] AIFixRequest request,
    CancellationToken cancellationToken)
    {
        if (request is null)
        {
            return BadRequest(ApiResponse<AIReviewResult>.Fail("Request cannot be null."));
        }

        try
        {
            var reviewRequest = new AIReviewRequest
            {
                Provider = request.Provider,
                Model = request.Model,
                Temperature = request.Temperature,
                MaxTokens = request.MaxTokens,

                FileName = request.FileName,
                SourceCode = request.SourceCode,

                RuleId = request.RuleId,
                DiagnosticMessage = request.Message,
                LineNumber = request.LineNumber,

                RoslynAnalysis =
         $"Rule Id: {request.RuleId}{Environment.NewLine}" +
         $"Message: {request.Message}{Environment.NewLine}" +
         $"Line Number: {request.LineNumber}"
            };

            var result = await aiReviewService.ReviewAsync(reviewRequest, cancellationToken);

            return Ok(ApiResponse<AIReviewResult>.Ok(
                result,
                "AI fix generated successfully."));
        }
        catch (Exception ex)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                ApiResponse<AIReviewResult>.Fail(ex.Message));
        }
    }
}