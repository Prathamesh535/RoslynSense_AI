namespace RoslynSense.API.Models.Internal;

public sealed class SyntaxAnalysisResult
{
    public int Classes { get; init; }

    public int Interfaces { get; init; }

    public int Methods { get; init; }

    public int Properties { get; init; }

    public int Fields { get; init; }
}