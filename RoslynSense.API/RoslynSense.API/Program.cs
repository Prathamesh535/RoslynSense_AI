
using RoslynSense.API.AI.Configuration;
using RoslynSense.API.AI.Factory;
using RoslynSense.API.AI.Providers;
using RoslynSense.API.Interfaces;
using RoslynSense.API.Options;
using RoslynSense.API.Services;
using RoslynSense.API.Services.AIModels;

namespace RoslynSense.API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddOptions<UploadOptions>().Bind(builder.Configuration.GetSection(UploadOptions.SectionName)).ValidateDataAnnotations().ValidateOnStart();
        builder.Services.AddOptions<WorkspaceOptions>().Bind(builder.Configuration.GetSection(WorkspaceOptions.SectionName)).ValidateDataAnnotations().ValidateOnStart();
        builder.Services.AddOptions<GitHubOptions>().Bind(builder.Configuration.GetSection(GitHubOptions.SectionName)).ValidateDataAnnotations().ValidateOnStart();
       

        builder.Services.AddScoped<IUploadService, UploadService>();
        builder.Services.AddHttpClient<IGitHubService, GitHubService>();
        builder.Services.AddScoped<IProjectScanner, ProjectScanner>();
        builder.Services.AddScoped<IRoslynAnalyzer, RoslynAnalyzer>();
        builder.Services.AddScoped<IPromptBuilder, PromptBuilder>();
        builder.Services.AddScoped<IAIReviewService, AIReviewService>();
        builder.Services.AddScoped<IScanOrchestrationService, ScanOrchestrationService>();
        builder.Services.AddScoped<IAnalysisService, AnalysisService>();

        builder.Services.Configure<GeminiOptions>(
        builder.Configuration.GetSection("AIProviders:Gemini"));

        builder.Services.AddScoped<OllamaProvider>();
        builder.Services.AddHttpClient<GeminiProvider>();

        builder.Services.Configure<OpenRouterOptions>(
        builder.Configuration.GetSection("AIProviders:OpenRouter"));
        builder.Services.AddScoped<RoslynCodeExtractor>();
        builder.Services.AddScoped<IAIProviderFactory, AIProviderFactory>();

        builder.Services.AddScoped<IModelDiscoveryService, ModelDiscoveryService>();


        builder.Services.AddHttpClient<OpenRouterProvider>();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("ReactPolicy", policy =>
            {
                policy
                    .WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors("ReactPolicy");

        if (!app.Environment.IsDevelopment())
        {
            app.UseHttpsRedirection();
        }
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}
