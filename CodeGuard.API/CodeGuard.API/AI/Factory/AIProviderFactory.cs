using CodeGuard.API.AI.Interfaces;
using CodeGuard.API.AI.Providers;

namespace CodeGuard.API.AI.Factory;

public class AIProviderFactory : IAIProviderFactory
{
    private readonly OpenRouterProvider _openRouter;
    private readonly OllamaProvider _ollama;
    private readonly GeminiProvider _gemini;

    public AIProviderFactory(
        OpenRouterProvider openRouter,
        OllamaProvider ollama,
        GeminiProvider gemini)
    {
        _openRouter = openRouter;
        _ollama = ollama;
        _gemini = gemini;
    }

    public IAIProvider GetProvider(string provider)
    {
        return provider.ToLower() switch
        {
            "openrouter" => _openRouter,
            "ollama" => _ollama,
            "gemini" => _gemini,
            _ => throw new Exception("Invalid AI provider.")
        };
    }
}