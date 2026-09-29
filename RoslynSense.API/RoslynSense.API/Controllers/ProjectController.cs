using RoslynSense.API.Interfaces;
using RoslynSense.API.Models.Common;
using RoslynSense.API.Models.Requests;
using RoslynSense.API.Models.Responses;
using Microsoft.AspNetCore.Mvc;

namespace RoslynSense.API.Controllers;

[ApiController]
[Route("api/projects")]
public sealed class ProjectController(IScanOrchestrationService scanOrchestrationService) : ControllerBase
{
    
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<ApiResponse<UploadProjectResponse>>> UploadProject(
    [FromForm] UploadProjectRequest request,
    CancellationToken cancellationToken)
    {
        var response = await scanOrchestrationService.StartUploadAsync(
            request.File,
            cancellationToken);

        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpPost("github")]
    [ProducesResponseType(typeof(ApiResponse<UploadProjectResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<UploadProjectResponse>), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiResponse<UploadProjectResponse>>> CloneGitHubProject(
        [FromBody] GitHubProjectRequest? request,
        CancellationToken cancellationToken)
    {
        var response = await scanOrchestrationService.StartGitHubAsync(request?.RepositoryUrl, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }
}
