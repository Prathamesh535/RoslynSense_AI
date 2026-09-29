namespace CodeGuard.API.Options;

public sealed class AIProviderOptions
{
    public string Provider { get; init; } = "Ollama";

    public string Model { get; init; } = string.Empty;

    public string Endpoint { get; init; } = string.Empty;

    public string ApiKey { get; init; } = string.Empty;

    public double Temperature { get; init; } = 0.2;

    public int MaxTokens { get; init; } = 4096;

    public string Reasoning { get; init; } = "Medium";
}