namespace RoslynSense.API.AI.DTOs;

public class ChatResponse
{
    public bool Success { get; set; }

    public string Response { get; set; } = string.Empty;

    public string Model { get; set; } = string.Empty;

    public string Provider { get; set; } = string.Empty;
}