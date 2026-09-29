namespace RoslynSense.API.AI.Configuration;

public sealed class GeminiOptions
{
    public const string SectionName = "Gemini";

    public string ApiKey { get; init; } = "";

    public string BaseUrl { get; init; } = "";
}