namespace RoslynSense.API.Models.Requests;

public sealed class AIFixRequest
{
    public string FileName { get; init; } = string.Empty;

    public string SourceCode { get; init; } = string.Empty;

    public string RuleId { get; init; } = string.Empty;

    public string Message { get; init; } = string.Empty;

    public int LineNumber { get; init; }
    public string Provider { get; init; } = "openrouter";

    public string Model { get; init; } = "";

    public double Temperature { get; init; } = 0.2;

    public int MaxTokens { get; init; } = 4000;
}