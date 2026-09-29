namespace RoslynSense.API.Models.Internal;

public sealed class AIReviewResult
{
    public string RuleId { get; init; } = "";

    public string Title { get; init; } = "";

    public string Explanation { get; init; } = "";

    public string WhyItMatters { get; init; } = "";

    public string MinimalFix { get; init; } = "";

    public string OptimizedCode { get; init; } = "";

    public string TimeComplexity { get; init; } = "";

    public string SpaceComplexity { get; init; } = "";

    public List<string> Improvements { get; init; } = new();
    public bool CanAutoApply { get; init; }
    public string OriginalCode { get; set; } = "";

    public string FixedCode { get; set; } = "";

    public string BlockType { get; set; } = "";

    public string BlockName { get; set; } = "";

    public int StartLine { get; set; }

    public int EndLine { get; set; }
}
