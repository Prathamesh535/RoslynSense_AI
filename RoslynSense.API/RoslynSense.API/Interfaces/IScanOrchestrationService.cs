using RoslynSense.API.Models.Common;
using RoslynSense.API.Models.Responses;

namespace RoslynSense.API.Interfaces;

public interface IScanOrchestrationService
{
    Task<ApiResponse<UploadProjectResponse>> StartUploadAsync(IFormFile? file, CancellationToken cancellationToken = default);
    Task<ApiResponse<UploadProjectResponse>> StartGitHubAsync(string? repositoryUrl, CancellationToken cancellationToken = default);
}
