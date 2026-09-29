using System.ComponentModel.DataAnnotations;

namespace RoslynSense.API.Options;

public sealed class OllamaOptions
{
    public const string SectionName = "Ollama";

    [Required]
    [Url]
    public string BaseUrl { get; init; } = "http://localhost:11434/";

    [Required]
    public string Model { get; init; } = "llama3.1";
}
