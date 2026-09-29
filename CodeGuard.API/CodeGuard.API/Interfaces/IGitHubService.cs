using CodeGuard.API.Models.Responses;

namespace CodeGuard.API.Interfaces;

public interface IGitHubService
{
    Task<UploadProjectResponse> CloneProjectAsync(
        string? repositoryUrl,
        CancellationToken cancellationToken = default);
}
