using CodeGuard.API.AI.DTOs;
using CodeGuard.API.AI.Factory;
using CodeGuard.API.Interfaces;
using CodeGuard.API.Models.Internal;
using CodeGuard.API.Models.Requests;
using CodeGuard.API.Models.Responses;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace CodeGuard.API.Services;

public sealed class AIReviewService(
    IPromptBuilder promptBuilder,
   RoslynCodeExtractor codeExtractor,
    IAIProviderFactory providerFactory)
    : IAIReviewService
{
    public async Task<AIReviewResult> ReviewAsync(
    AIReviewRequest request,
    CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        // STEP 1 - Extract only the affected method
        var extractedBlock = codeExtractor.ExtractCodeBlock(
    request.SourceCode!,
    request.LineNumber);

        if (extractedBlock is null)
        {
            throw new InvalidOperationException(
                $"Unable to locate method containing line {request.LineNumber}.");
        }

        // STEP 2 - Create a NEW request for AI
        var aiRequest = new AIReviewRequest
        {
            FileName = request.FileName,

            // IMPORTANT: Send ONLY the extracted method
            SourceCode = extractedBlock.Code,

            RuleId = request.RuleId,
            DiagnosticMessage = request.DiagnosticMessage,
            LineNumber = request.LineNumber,
            RoslynAnalysis = request.RoslynAnalysis,

            Provider = request.Provider,
            Model = request.Model,
            Temperature = request.Temperature,
            MaxTokens = request.MaxTokens
        };

        // STEP 3 - Build prompt using extracted method
        var prompt = promptBuilder.Build(aiRequest);

        var provider = providerFactory.GetProvider(aiRequest.Provider);

        var response = await provider.ChatAsync(new ChatRequest
        {
            Provider = aiRequest.Provider,
            Model = aiRequest.Model,
            Prompt = prompt,
            Temperature = aiRequest.Temperature,
            MaxTokens = aiRequest.MaxTokens
        });

        var rawResponse = response.Response;

        var result = ParseReviewResult(rawResponse);

        result.OriginalCode = extractedBlock.Code;
        result.BlockType = extractedBlock.BlockType;
        // These properties need to exist in AIReviewResult
        result.StartLine = extractedBlock.StartLine;
        result.EndLine = extractedBlock.EndLine;
        result.BlockName = extractedBlock.BlockName;
        result.FixedCode = result.OptimizedCode;

        return result;
    }
    public CodeBlockExtractionResult? ExtractCodeBlock(
    string sourceCode,
    int lineNumber)
    {
        var tree = CSharpSyntaxTree.ParseText(sourceCode);

        var root = tree.GetRoot();

        // Method
        foreach (var method in root.DescendantNodes().OfType<MethodDeclarationSyntax>())
        {
            var span = method.GetLocation().GetLineSpan();

            var start = span.StartLinePosition.Line + 1;

            var end = span.EndLinePosition.Line + 1;

            if (lineNumber >= start &&
                lineNumber <= end)
            {
                return new CodeBlockExtractionResult
                {
                    BlockType = "Method",

                    BlockName = method.Identifier.Text,

                    Code = method.ToFullString(),

                    StartLine = start,

                    EndLine = end
                };
            }
        }

        return null;
    }
    private static AIReviewResult ParseReviewResult(string rawResponse)
    {
        if (string.IsNullOrWhiteSpace(rawResponse))
        {
            return new AIReviewResult();
        }

        var reviewJson = ExtractReviewJson(rawResponse);

        if (string.IsNullOrWhiteSpace(reviewJson))
        {
            throw new InvalidOperationException("AI provider returned an empty response.");
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<AIReviewResult>(
                reviewJson,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

            if (parsed is null)
            {
                throw new InvalidOperationException("AI response could not be deserialized.");
            }

            return parsed;
        }
        catch (JsonException ex)
        {
            throw new InvalidOperationException(
                $"AI returned an invalid JSON response.{Environment.NewLine}{reviewJson}",
                ex);
        }
    }

    private static string? ExtractReviewJson(string rawResponse)
    {
        try
        {
            using var document = JsonDocument.Parse(rawResponse);

            if (document.RootElement.TryGetProperty("response", out var response))
            {
                return response.GetString();
            }

            return rawResponse;
        }
        catch (JsonException)
        {
            return rawResponse;
        }
    }

}
