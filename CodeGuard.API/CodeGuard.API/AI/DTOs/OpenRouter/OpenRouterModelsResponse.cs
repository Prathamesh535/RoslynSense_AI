using System.Text.Json.Serialization;

namespace CodeGuard.API.AI.DTOs.OpenRouter;

public class OpenRouterModelsResponse
{
    [JsonPropertyName("data")]
    public List<OpenRouterModel> Data { get; set; } = new();
}