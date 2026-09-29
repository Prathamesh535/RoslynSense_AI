using CodeGuard.API.Models.Responses;

namespace CodeGuard.API.Interfaces;

public interface IUploadService
{
    Task<UploadProjectResponse> UploadProjectAsync(IFormFile? file, CancellationToken cancellationToken = default);
}
