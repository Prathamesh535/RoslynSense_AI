using RoslynSense.API.AI.DTOs;
using RoslynSense.API.AI.Factory;
using RoslynSense.API.Interfaces;
using RoslynSense.API.Models.Responses;

namespace RoslynSense.API.Services.AIModels;

public sealed class ModelDiscoveryService : IModelDiscoveryService
{
    private readonly IAIProviderFactory _providerFactory;

    public ModelDiscoveryService(
        IAIProviderFactory providerFactory)
    {
        _providerFactory = providerFactory;
    }

    public Task<List<AIProviderResponse>> GetProvidersAsync()
    {
        return Task.FromResult(new List<AIProviderResponse>
        {
            new()
            {
                Id = "openrouter",
                Name = "OpenRouter"
            },
            new()
            {
                Id = "gemini",
                Name = "Gemini"
            }
        });
    }

    public async Task<List<AIModelDto>> GetModelsAsync(string provider)
    {
        var aiProvider = _providerFactory.GetProvider(provider);

        return await aiProvider.GetModelsAsync();
    }
}