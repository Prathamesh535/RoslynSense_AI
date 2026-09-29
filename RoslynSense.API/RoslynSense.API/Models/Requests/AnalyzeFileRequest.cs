using System.ComponentModel.DataAnnotations;

namespace RoslynSense.API.Models.Requests;

public sealed class AnalyzeFileRequest
{
    [Required]
    public string FileName { get; init; } = string.Empty;

    [Required]
    public string SourceCode { get; init; } = string.Empty;

    public string Language { get; init; } = "csharp";
    public string Provider { get; init; } = "openrouter";

    public string Model { get; init; } = "";

    public double Temperature { get; init; } = 0.2;

    public int MaxTokens { get; init; } = 4000;
}