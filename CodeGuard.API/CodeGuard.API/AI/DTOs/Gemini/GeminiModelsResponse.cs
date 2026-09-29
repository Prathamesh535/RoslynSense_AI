using System.Text.Json.Serialization;

namespace CodeGuard.API.AI.DTOs.Gemini;

public sealed class GeminiModelsResponse
{
    [JsonPropertyName("models")]
    public List<GeminiModelDto> Models { get; set; } = [];
}

public sealed class GeminiModelDto
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = "";

    [JsonPropertyName("displayName")]
    public string DisplayName { get; set; } = "";

    [JsonPropertyName("supportedGenerationMethods")]
    public List<string> SupportedGenerationMethods { get; set; } = [];
}