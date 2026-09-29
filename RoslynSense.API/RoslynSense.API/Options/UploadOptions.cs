using System.ComponentModel.DataAnnotations;

namespace RoslynSense.API.Options;

public sealed class UploadOptions
{
    public const string SectionName = "Upload";

    [Range(1, long.MaxValue)]
    public long MaxFileSizeBytes { get; init; } = 104_857_600;
}
