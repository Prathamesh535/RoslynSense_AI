using RoslynSense.API.AI.DTOs;
using RoslynSense.API.Models.Responses;

public interface IModelDiscoveryService
{
    Task<List<AIProviderResponse>> GetProvidersAsync();

    Task<List<AIModelDto>> GetModelsAsync(string provider);
}