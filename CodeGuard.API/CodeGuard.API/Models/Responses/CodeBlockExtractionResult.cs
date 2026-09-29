namespace CodeGuard.API.Models.Responses;

public sealed class CodeBlockExtractionResult
{
    public string BlockType { get; init; } = "";

    public string BlockName { get; init; } = "";

    public string ContainingType { get; init; } = "";

    public string Code { get; init; } = "";

    public int StartLine { get; init; }

    public int EndLine { get; init; }
}