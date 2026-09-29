using RoslynSense.API.AI.DTOs;
using RoslynSense.API.AI.Interfaces;

namespace RoslynSense.API.AI.Providers;

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