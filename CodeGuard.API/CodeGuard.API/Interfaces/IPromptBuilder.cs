using CodeGuard.API.Models.Requests;

namespace CodeGuard.API.Interfaces;

public interface IPromptBuilder
{
    string Build(AIReviewRequest request);
}
