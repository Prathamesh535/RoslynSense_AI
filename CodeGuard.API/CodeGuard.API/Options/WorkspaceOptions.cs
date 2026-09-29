using System.ComponentModel.DataAnnotations;

namespace CodeGuard.API.Options;

public sealed class WorkspaceOptions
{
    public const string SectionName = "Workspace";
    public const string DirectoryName = "CodeGuardWorkspace";

    [Required]
    public string RootPath { get; init; } = Path.Combine(Path.GetTempPath(), DirectoryName);
}
