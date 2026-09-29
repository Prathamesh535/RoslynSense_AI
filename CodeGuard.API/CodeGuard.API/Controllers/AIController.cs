using CodeGuard.API.AI.DTOs;
using CodeGuard.API.AI.Factory;
using CodeGuard.API.Interfaces;
using CodeGuard.API.Models.Requests;
using CodeGuard.API.Models.Responses;
using Microsoft.AspNetCore.Mvc;

namespace CodeGuard.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly IAIProviderFactory _providerFactory;
    private readonly IAIReviewService _reviewService;
    private readonly IModelDiscoveryService _modelService;

    public AIController(
        IAIProviderFactory providerFactory, IAIReviewService reviewService, IModelDiscoveryService modelService
        )
    {
        _providerFactory = providerFactory;
        _reviewService = reviewService;
        _modelService = modelService;

    }


    [HttpGet("providers")]
    public async Task<IActionResult> GetProviders()
    {
        return Ok(await _modelService.GetProvidersAsync());
    }

    [HttpGet("models/{provider}")]
    public async Task<IActionResult> GetModels(string provider)
    {
        return Ok(await _modelService.GetModelsAsync(provider));
    }

    [HttpPost("chat")]
    public async Task<IActionResult> Chat(ChatRequest request)
    {
        var provider = _providerFactory.GetProvider(request.Provider);

        var response = await provider.ChatAsync(request);

        return Ok(response);
    }

    [HttpPost("review")]
    public async Task<IActionResult> Review(
        [FromBody] AIReviewRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _reviewService.ReviewAsync(
            request,
            cancellationToken);

        return Ok(result);
    }

}