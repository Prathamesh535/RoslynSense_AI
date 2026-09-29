using CodeGuard.API.Models.Internal;

namespace CodeGuard.API.Interfaces;

public interface IProjectScanner
{
    ProjectScanResult Scan(Guid scanId, string workspacePath, CancellationToken cancellationToken = default);
}
