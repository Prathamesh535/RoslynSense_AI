using RoslynSense.API.Models.Requests;

namespace RoslynSense.API.Interfaces;

public interface IPromptBuilder
{
    string Build(AIReviewRequest request);
}
