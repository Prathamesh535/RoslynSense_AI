using CodeGuard.API.Interfaces;
using CodeGuard.API.Models.Common;
using CodeGuard.API.Models.Internal;
using CodeGuard.API.Models.Requests;
using CodeGuard.API.Models.Responses;

namespace CodeGuard.API.Services;

public sealed class ScanOrchestrationService(
    IUploadService uploadService,
    IGitHubService gitHubService,
    IProjectScanner projectScanner,
    IRoslynAnalyzer roslynAnalyzer,
    IAIReviewService aiReviewService,
    ILogger<ScanOrchestrationService> logger)
    : IScanOrchestrationService
{
    public async Task<ApiResponse<UploadProjectResponse>> StartUploadAsync(
        IFormFile? file,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var uploadResult = await uploadService.UploadProjectAsync(file, cancellationToken);
            return await ScanProjectAsync(uploadResult, "Project uploaded and extracted successfully.", cancellationToken);
        }
        catch (ArgumentException exception)
        {
            return ApiResponse<UploadProjectResponse>.Fail("Project upload validation failed.", exception.Message);
        }
        catch (InvalidDataException exception)
        {
            return ApiResponse<UploadProjectResponse>.Fail("The uploaded ZIP archive is invalid.", exception.Message);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            return ApiResponse<UploadProjectResponse>.Fail("Project upload was cancelled.");
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Project upload failed unexpectedly.");
            return ApiResponse<UploadProjectResponse>.Fail("Unable to process the project upload.");
        }
    }

    public async Task<ApiResponse<UploadProjectResponse>> StartGitHubAsync(
        string? repositoryUrl,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var cloneResult = await gitHubService.CloneProjectAsync(repositoryUrl, cancellationToken);
            return await ScanProjectAsync(cloneResult, "GitHub repository cloned and scanned successfully.", cancellationToken);
        }
        catch (ArgumentException exception)
        {
            return ApiResponse<UploadProjectResponse>.Fail("GitHub repository validation failed.", exception.Message);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            return ApiResponse<UploadProjectResponse>.Fail("GitHub repository processing was cancelled.");
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "GitHub repository processing failed unexpectedly.");
            return ApiResponse<UploadProjectResponse>.Fail("Unable to process the GitHub repository.");
        }
    }

    private async Task<ApiResponse<UploadProjectResponse>> ScanProjectAsync(
        UploadProjectResponse workspaceResult,
        string successMessage,
        CancellationToken cancellationToken)
    {
        var projectScanResult = projectScanner.Scan(
            workspaceResult.ScanId,
            workspaceResult.WorkspacePath,
            cancellationToken);

        var analyzedFiles = await AnalyzeFilesAsync(
            projectScanResult.SourceFiles,
            workspaceResult.WorkspacePath,
            cancellationToken);

        var overallSyntaxAnalysis = new SyntaxAnalysisResult
        {
            Classes = analyzedFiles.Sum(file => file.SyntaxAnalysis?.Classes ?? 0),
            Interfaces = analyzedFiles.Sum(file => file.SyntaxAnalysis?.Interfaces ?? 0),
            Methods = analyzedFiles.Sum(file => file.SyntaxAnalysis?.Methods ?? 0),
            Properties = analyzedFiles.Sum(file => file.SyntaxAnalysis?.Properties ?? 0),
            Fields = analyzedFiles.Sum(file => file.SyntaxAnalysis?.Fields ?? 0)
        };

        
        
        var result = new UploadProjectResponse
        {
            ScanId = workspaceResult.ScanId,
            WorkspacePath = workspaceResult.WorkspacePath,
            ProjectScanResult = projectScanResult,
            FileAnalysisResults = analyzedFiles,
           
            OverallSyntaxAnalysis = overallSyntaxAnalysis
        };
        return ApiResponse<UploadProjectResponse>.Ok(result, successMessage);
    }

    private async Task<FileAnalysisResult[]> AnalyzeFilesAsync(
        IReadOnlyList<SourceFile> sourceFiles,
        string workspacePath,
        CancellationToken cancellationToken)
    {
        var analyzedFiles = new List<FileAnalysisResult>();

        foreach (var sourceFile in sourceFiles.Where(file => string.Equals(file.Extension, ".cs", StringComparison.OrdinalIgnoreCase)))
        {
            cancellationToken.ThrowIfCancellationRequested();

            var analysis = roslynAnalyzer.AnalyzeFile(sourceFile, workspacePath);
            var aiReview = await ReviewFileAsync(sourceFile, workspacePath, cancellationToken);

            analyzedFiles.Add(new FileAnalysisResult
            {
                FileName = analysis.FileName,
                RelativePath = analysis.RelativePath,
                SyntaxAnalysis = analysis.SyntaxAnalysis,
                Diagnostics = analysis.Diagnostics,
                SyntaxErrors = analysis.SyntaxErrors,
                AIReviewResult = aiReview
            });
        }

        return analyzedFiles.ToArray();
    }

    private async Task<AIReviewResult> ReviewFileAsync(
     SourceFile sourceFile,
     string workspacePath,
     CancellationToken cancellationToken)
    {
        try
        {
            var fullPath = Path.Combine(workspacePath, sourceFile.RelativePath);

            var sourceCode = File.Exists(fullPath)
                ? await File.ReadAllTextAsync(fullPath, cancellationToken)
                : string.Empty;

            var request = new AIReviewRequest
            {
                Provider = "openrouter",
                Model = "cohere/north-mini-code:free",

                FileName = sourceFile.FileName,
                SourceCode = sourceCode,

                RuleId = "FileReview",
                DiagnosticMessage = "Review the entire file.",
                LineNumber = 1,
                RoslynAnalysis = "General code review."
            };

            return await aiReviewService.ReviewAsync(request, cancellationToken);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            throw;
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "AI review failed for {FileName}.", sourceFile.RelativePath);

            return new AIReviewResult
            {
                RuleId = "",
                Title = "AI Review Failed",
                Explanation = ex.Message,
                WhyItMatters = "",
                MinimalFix = "",
                OptimizedCode = "",
                TimeComplexity = "",
                SpaceComplexity = "",
                Improvements = new(),
                CanAutoApply = false
            };
        }
    }
}
