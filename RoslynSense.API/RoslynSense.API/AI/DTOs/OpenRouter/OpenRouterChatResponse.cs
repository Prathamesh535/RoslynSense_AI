using System.Text.Json.Serialization;

namespace RoslynSense.API.AI.DTOs.OpenRouter;

public class OpenRouterChatResponse
{
    [JsonPropertyName("choices")]
    public List<OpenRouterChoice> Choices { get; set; } = new();
}