using CodeGuard.API.AI.Configuration;
using CodeGuard.API.AI.DTOs;
using CodeGuard.API.AI.DTOs.Gemini;
using CodeGuard.API.AI.Interfaces;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace CodeGuard.API.AI.Providers;

public class GeminiProvider : IAIProvider
{
    private readonly HttpClient _httpClient;
    private readonly GeminiOptions _options;

    public string Name => "Gemini";

    public GeminiProvider(
        HttpClient httpClient,
        IOptions<GeminiOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;

        _httpClient.BaseAddress = new Uri(_options.BaseUrl);
    }

    public async Task<List<AIModelDto>> GetModelsAsync()
    {
        var response = await _httpClient.GetAsync(
            $"models?key={_options.ApiKey}");

        var json = await response.Content.ReadAsStringAsync();

        Console.WriteLine(json);

        response.EnsureSuccessStatusCode();

        var result = JsonSerializer.Deserialize<GeminiModelsResponse>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

        if (result == null)
            return [];

        return result.Models
            .Where(x =>
                x.Name.StartsWith("models/gemini") &&
                x.SupportedGenerationMethods.Contains("generateContent"))
            .OrderBy(x => x.DisplayName)
            .Select(x => new AIModelDto
            {
                Id = x.Name.Replace("models/", ""),
                Name = x.DisplayName,
                Provider = "Gemini",
                Free = true
            })
            .ToList();
    }

    public Task<ChatResponse> ChatAsync(ChatRequest request)
    {
        throw new NotImplementedException();
    }
}