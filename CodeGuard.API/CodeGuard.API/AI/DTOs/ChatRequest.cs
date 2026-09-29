namespace CodeGuard.API.AI.DTOs;

public class ChatRequest
{
    public string Provider { get; set; } = string.Empty;

    public string Model { get; set; } = string.Empty;

    public string Prompt { get; set; } = string.Empty;

    public double Temperature { get; set; } = 0.2;

    public int MaxTokens { get; set; } = 2048;
}