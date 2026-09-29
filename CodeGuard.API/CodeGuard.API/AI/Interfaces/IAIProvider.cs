using CodeGuard.API.AI.DTOs;
namespace CodeGuard.API.AI.Interfaces;
public interface IAIProvider
{
    string Name { get; }

    Task<List<AIModelDto>> GetModelsAsync();

    Task<ChatResponse> ChatAsync(ChatRequest request);
}