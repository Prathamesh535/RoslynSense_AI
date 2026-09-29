using RoslynSense.API.AI.DTOs;
namespace RoslynSense.API.AI.Interfaces;
public interface IAIProvider
{
    string Name { get; }

    Task<List<AIModelDto>> GetModelsAsync();

    Task<ChatResponse> ChatAsync(ChatRequest request);
}