using System.Text.Json.Serialization;

namespace RoslynSense.API.AI.DTOs.OpenRouter;

public class OpenRouterChoice
{
    [JsonPropertyName("message")]
    public OpenRouterMessage Message { get; set; } = new();

    [JsonPropertyName("finish_reason")]
    public string? FinishReason { get; set; }
}