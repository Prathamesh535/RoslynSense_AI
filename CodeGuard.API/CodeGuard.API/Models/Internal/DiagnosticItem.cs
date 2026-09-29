namespace CodeGuard.API.Models.Internal;

public sealed class DiagnosticItem
{
    public string Id { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
    public string Severity { get; init; } = string.Empty;
    public string Location { get; init; } = string.Empty;
}
