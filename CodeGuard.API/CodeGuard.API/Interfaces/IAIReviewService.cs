using CodeGuard.API.Models.Internal;
using CodeGuard.API.Models.Requests;

namespace CodeGuard.API.Interfaces;

public interface IAIReviewService
{
    Task<AIReviewResult> ReviewAsync(AIReviewRequest request, CancellationToken cancellationToken = default);
}
