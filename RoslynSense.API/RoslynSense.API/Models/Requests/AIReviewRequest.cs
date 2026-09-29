namespace RoslynSense.API.Models.Requests;

public sealed class AIReviewRequest
{
    public string? FileName { get; init; }

    public string? SourceCode { get; init; }

    public string? RuleId { get; init; }

    public string? DiagnosticMessage { get; init; }

    public int LineNumber { get; init; }

    public string? RoslynAnalysis { get; init; }

    // ---------- AI Settings ----------

    public string Provider { get; init; } = "openrouter";

    public string Model { get; init; } = "";

    public double Temperature { get; init; } = 0.2;

    public int MaxTokens { get; init; } = 4000;
}