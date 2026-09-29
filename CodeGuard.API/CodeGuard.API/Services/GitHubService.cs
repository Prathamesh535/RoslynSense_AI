using System.Text.Json;
using CodeGuard.API.Interfaces;
using CodeGuard.API.Models.Responses;
using CodeGuard.API.Options;
using LibGit2Sharp;
using Microsoft.Extensions.Options;

namespace CodeGuard.API.Services;

public sealed class GitHubService(
    HttpClient httpClient,
    IOptions<GitHubOptions> gitHubOptions,
    IOptions<WorkspaceOptions> workspaceOptions,
    IWebHostEnvironment hostEnvironment) : IGitHubService
{
    public async Task<UploadProjectResponse> CloneProjectAsync(
        string? repositoryUrl,
        CancellationToken cancellationToken = default)
    {
        var repository = ValidateRepositoryUrl(repositoryUrl);
        await EnsurePublicRepositoryAsync(repository.Owner, repository.Name, cancellationToken);

        var scanId = Guid.NewGuid();
        var workspaceRoot = Path.GetFullPath(workspaceOptions.Value.RootPath, hostEnvironment.ContentRootPath);
        var workspacePath = Path.Combine(workspaceRoot, scanId.ToString("N"));

        try
        {
            cancellationToken.ThrowIfCancellationRequested();
            Directory.CreateDirectory(workspaceRoot);
            Repository.Clone(repository.CloneUrl, workspacePath);
            cancellationToken.ThrowIfCancellationRequested();

            return new UploadProjectResponse
            {
                ScanId = scanId,
                WorkspacePath = workspacePath
            };
        }
        catch
        {
            if (Directory.Exists(workspacePath))
            {
                Directory.Delete(workspacePath, recursive: true);
            }

            throw;
        }
    }

    private RepositoryDetails ValidateRepositoryUrl(string? repositoryUrl)
    {
        if (string.IsNullOrWhiteSpace(repositoryUrl))
        {
            throw new ArgumentException("A GitHub repository URL is required.");
        }

        if (!Uri.TryCreate(repositoryUrl, UriKind.Absolute, out var uri) ||
            !string.Equals(uri.Scheme, Uri.UriSchemeHttps, StringComparison.OrdinalIgnoreCase) ||
            !Uri.TryCreate(gitHubOptions.Value.RepositoryBaseUrl, UriKind.Absolute, out var repositoryBaseUri) ||
            !string.Equals(uri.Host, repositoryBaseUri.Host, StringComparison.OrdinalIgnoreCase) ||
            uri.Port != repositoryBaseUri.Port ||
            !string.IsNullOrEmpty(uri.Query) ||
            !string.IsNullOrEmpty(uri.Fragment))
        {
            throw new ArgumentException("A valid HTTPS GitHub repository URL is required.");
        }

        var segments = uri.AbsolutePath.Trim('/').Split('/', StringSplitOptions.RemoveEmptyEntries);
        if (segments.Length != 2 || segments.Any(string.IsNullOrWhiteSpace))
        {
            throw new ArgumentException("A valid GitHub repository URL must include an owner and repository name.");
        }

        var repositoryName = segments[1].EndsWith(".git", StringComparison.OrdinalIgnoreCase)
            ? segments[1][..^4]
            : segments[1];

        if (string.IsNullOrWhiteSpace(repositoryName))
        {
            throw new ArgumentException("A valid GitHub repository URL must include a repository name.");
        }

        var cloneUrl = new Uri(repositoryBaseUri, $"{segments[0]}/{repositoryName}.git").AbsoluteUri;
        return new RepositoryDetails(segments[0], repositoryName, cloneUrl);
    }

    private async Task EnsurePublicRepositoryAsync(string owner, string name, CancellationToken cancellationToken)
    {
        var apiBaseUri = new Uri(gitHubOptions.Value.ApiBaseUrl, UriKind.Absolute);
        using var request = new HttpRequestMessage(HttpMethod.Get, new Uri(apiBaseUri, $"repos/{owner}/{name}"));
        request.Headers.UserAgent.ParseAdd("CodeGuard.API");

        using var response = await httpClient.SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            throw new ArgumentException("Only existing public GitHub repositories are supported.");
        }

        await using var responseStream = await response.Content.ReadAsStreamAsync(cancellationToken);
        using var document = await JsonDocument.ParseAsync(responseStream, cancellationToken: cancellationToken);
        if (!document.RootElement.TryGetProperty("private", out var privateProperty) || privateProperty.GetBoolean())
        {
            throw new ArgumentException("Only public GitHub repositories are supported.");
        }
    }

    private sealed record RepositoryDetails(string Owner, string Name, string CloneUrl);
}
