using CodeGuard.API.Models.Common;
using CodeGuard.API.Models.Responses;

namespace CodeGuard.API.Interfaces;

public interface IScanOrchestrationService
{
    Task<ApiResponse<UploadProjectResponse>> StartUploadAsync(IFormFile? file, CancellationToken cancellationToken = default);
    Task<ApiResponse<UploadProjectResponse>> StartGitHubAsync(string? repositoryUrl, CancellationToken cancellationToken = default);
}
