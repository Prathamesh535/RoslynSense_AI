using RoslynSense.API.AI.Configuration;
using RoslynSense.API.AI.DTOs;
using RoslynSense.API.AI.DTOs.OpenRouter;
using RoslynSense.API.AI.Interfaces;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Text.Json;

namespace RoslynSense.API.AI.Providers;

public class OpenRouterProvider : IAIProvider
{
    private readonly HttpClient _httpClient;
    private readonly OpenRouterOptions _options;

    public string Name => "OpenRouter";

    public OpenRouterProvider(
        HttpClient httpClient,
        IOptions<OpenRouterOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;

        _httpClient.BaseAddress = new Uri(_options.BaseUrl);
        Console.WriteLine($"BaseAddress: {_httpClient.BaseAddress}");
        if (!string.IsNullOrWhiteSpace(_options.ApiKey))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _options.ApiKey);
        }
    }

    public async Task<List<AIModelDto>> GetModelsAsync()
    {
        Console.WriteLine(new Uri(_httpClient.BaseAddress!, "models"));
        var response = await _httpClient.GetAsync("models");

        var content = await response.Content.ReadAsStringAsync();

        Console.WriteLine(content);

        response.EnsureSuccessStatusCode();

        var result = JsonSerializer.Deserialize<OpenRouterModelsResponse>(
            content,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

        if (result == null)
            return new List<AIModelDto>();

        return result.Data
            .Where(m => m.Pricing.Prompt == "0" &&
                        m.Pricing.Completion == "0")
            .OrderBy(m => m.Name)
            .Select(m => new AIModelDto
            {
                Id = m.Id,
                Name = m.Name,
                Provider = "OpenRouter",
                Free = true
            })
            .ToList();
    }

    public async Task<ChatResponse> ChatAsync(ChatRequest request)
    {
        var body = new OpenRouterChatRequest
        {
            Model = request.Model,
            Temperature = request.Temperature,
            MaxTokens = request.MaxTokens,
            Messages = new List<OpenRouterMessage>
        {
            new()
            {
                Role = "user",
                Content = request.Prompt
            }
        }
        };

        //var response = await _httpClient.PostAsJsonAsync("chat/completions", body);

        //response.EnsureSuccessStatusCode();

        //var result = await response.Content.ReadFromJsonAsync<OpenRouterChatResponse>();

        //return new ChatResponse
        //{
        //    Success = true,
        //    Provider = "OpenRouter",
        //    Model = request.Model,
        //    Response = result?.Choices.FirstOrDefault()?.Message.Content ?? ""
        //};
        var response = await _httpClient.PostAsJsonAsync("chat/completions", body);

        response.EnsureSuccessStatusCode();

        var rawJson = await response.Content.ReadAsStringAsync();

        Console.WriteLine("===== OpenRouter Raw Response =====");
        Console.WriteLine(rawJson);

        var result = JsonSerializer.Deserialize<OpenRouterChatResponse>(
            rawJson,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

        Console.WriteLine($"Finish Reason: {result?.Choices.FirstOrDefault()?.FinishReason}");

        return new ChatResponse
        {
            Success = true,
            Provider = "OpenRouter",
            Model = request.Model,
            Response = result?.Choices.FirstOrDefault()?.Message.Content ?? ""
        };
    }
}