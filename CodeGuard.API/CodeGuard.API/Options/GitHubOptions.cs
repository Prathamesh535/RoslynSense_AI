using System.ComponentModel.DataAnnotations;

namespace CodeGuard.API.Options;

public sealed class GitHubOptions
{
    public const string SectionName = "GitHub";

    [Required]
    [Url]
    public string RepositoryBaseUrl { get; init; } = "https://github.com/";

    [Required]
    [Url]
    public string ApiBaseUrl { get; init; } = "https://api.github.com/";
}
