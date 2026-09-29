using RoslynSense.API.Models.Responses;

namespace RoslynSense.API.Interfaces;

public interface IUploadService
{
    Task<UploadProjectResponse> UploadProjectAsync(IFormFile? file, CancellationToken cancellationToken = default);
}
