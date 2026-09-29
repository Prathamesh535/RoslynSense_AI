using System.ComponentModel.DataAnnotations;

namespace RoslynSense.API.Options;

public sealed class WorkspaceOptions
{
    public const string SectionName = "Workspace";
    public const string DirectoryName = "RoslynSenseWorkspace";

    [Required]
    public string RootPath { get; init; } = Path.Combine(Path.GetTempPath(), DirectoryName);
}
