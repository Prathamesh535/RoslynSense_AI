using CodeGuard.API.AI.DTOs;
using CodeGuard.API.Models.Responses;

public interface IModelDiscoveryService
{
    Task<List<AIProviderResponse>> GetProvidersAsync();

    Task<List<AIModelDto>> GetModelsAsync(string provider);
}