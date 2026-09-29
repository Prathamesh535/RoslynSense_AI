using System.Text.Json.Serialization;

namespace CodeGuard.API.AI.DTOs.OpenRouter;

public class OpenRouterModel
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("pricing")]
    public OpenRouterPricing Pricing { get; set; } = new();
}