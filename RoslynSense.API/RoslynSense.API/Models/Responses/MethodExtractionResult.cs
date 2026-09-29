namespace RoslynSense.API.Models.Responses;

public sealed class MethodExtractionResult
{
    public string MethodName { get; init; } = "";

    public string MethodCode { get; init; } = "";

    public int StartLine { get; init; }

    public int EndLine { get; init; }
}