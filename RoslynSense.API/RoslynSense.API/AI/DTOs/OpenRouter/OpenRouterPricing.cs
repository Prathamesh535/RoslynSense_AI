using System.Text.Json.Serialization;

namespace RoslynSense.API.AI.DTOs.OpenRouter;

public class OpenRouterPricing
{
    [JsonPropertyName("prompt")]
    public string Prompt { get; set; } = "0";

    [JsonPropertyName("completion")]
    public string Completion { get; set; } = "0";
}