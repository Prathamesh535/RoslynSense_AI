using RoslynSense.API.Models.Internal;
using RoslynSense.API.Models.Requests;

namespace RoslynSense.API.Interfaces;

public interface IAIReviewService
{
    Task<AIReviewResult> ReviewAsync(AIReviewRequest request, CancellationToken cancellationToken = default);
}
