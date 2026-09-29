using System.Text.Json.Serialization;

namespace RoslynSense.API.AI.DTOs.OpenRouter;

public class OpenRouterModelsResponse
{
    [JsonPropertyName("data")]
    public List<OpenRouterModel> Data { get; set; } = new();
}