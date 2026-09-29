using RoslynSense.API.Models.Internal;

namespace RoslynSense.API.Interfaces;

public interface IProjectScanner
{
    ProjectScanResult Scan(Guid scanId, string workspacePath, CancellationToken cancellationToken = default);
}
