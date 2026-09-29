using CodeGuard.API.AI.DTOs;
using CodeGuard.API.AI.Interfaces;

namespace CodeGuard.API.AI.Providers;

public class OllamaProvider : IAIProvider
{
    public string Name => "Ollama";

    public Task<List<AIModelDto>> GetModelsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<ChatResponse> ChatAsync(ChatRequest request)
    {
        throw new NotImplementedException();
    }
}