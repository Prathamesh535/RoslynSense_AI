using RoslynSense.API.Models.Responses;

namespace RoslynSense.API.Interfaces;

public interface IGitHubService
{
    Task<UploadProjectResponse> CloneProjectAsync(
        string? repositoryUrl,
        CancellationToken cancellationToken = default);
}
