using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Concurrent;
using System;
using System.IO;
using System.Linq;
using CodeGuard.API.Interfaces;
using CodeGuard.API.Models.Internal;
using System.Reflection;
namespace CodeGuard.API.Services;

public sealed class RoslynAnalyzer : IRoslynAnalyzer
{
    private readonly ConcurrentDictionary<string, Lazy<CompilationCache>> compilationCacheByWorkspace = new(StringComparer.OrdinalIgnoreCase);

    public FileAnalysisResult AnalyzeFile(
     SourceFile sourceFile,
     string workspacePath)
    {
        if (!string.Equals(
            sourceFile.Extension,
            ".cs",
            StringComparison.OrdinalIgnoreCase))
        {
            return EmptyResult(
                sourceFile.FileName,
                sourceFile.RelativePath);
        }

        var fullPath = Path.Combine(
            workspacePath,
            sourceFile.RelativePath);

        if (!File.Exists(fullPath))
        {
            return EmptyResult(
                sourceFile.FileName,
                sourceFile.RelativePath);
        }

        var sourceCode = File.ReadAllText(fullPath);

        var compilation = GetOrCreateCompilation(workspacePath);

        return AnalyzeCore(
            sourceFile.FileName,
            sourceFile.RelativePath,
            sourceCode,
            compilation,
            fullPath);
    }
    public FileAnalysisResult AnalyzeSourceCode(
    string fileName,
    string sourceCode)
    {
        if (string.IsNullOrWhiteSpace(sourceCode))
        {
            return EmptyResult(
                fileName,
                fileName);
        }

        return AnalyzeCore(
            fileName,
            fileName,
            sourceCode,
            null,
            $"InMemory/{fileName}");
    }
    private FileAnalysisResult AnalyzeCore(
    string fileName,
    string relativePath,
    string sourceCode,
    CSharpCompilation? compilation,
    string filePath)
    {
        try
        {
            var syntaxTree = CSharpSyntaxTree.ParseText(
                sourceCode,
                new CSharpParseOptions(),
                filePath);

            var root = syntaxTree.GetRoot();

            var classCount = root.DescendantNodes()
                .OfType<ClassDeclarationSyntax>()
                .Count();

            var interfaceCount = root.DescendantNodes()
                .OfType<InterfaceDeclarationSyntax>()
                .Count();

            var methodCount = root.DescendantNodes()
                .OfType<MethodDeclarationSyntax>()
                .Count();

            var propertyCount = root.DescendantNodes()
                .OfType<PropertyDeclarationSyntax>()
                .Count();

            var fieldCount = root.DescendantNodes()
                .OfType<FieldDeclarationSyntax>()
                .Count();

            DiagnosticItem[] diagnostics;

            if (compilation != null)
            {
                diagnostics = compilation
                    .GetDiagnostics()
                    .Where(d =>
                        d.Location == Location.None ||
                        string.Equals(
                            d.Location.SourceTree?.FilePath,
                            filePath,
                            StringComparison.OrdinalIgnoreCase))
                    .Select(d => new DiagnosticItem
                    {
                        Id = d.Id,
                        Message = d.GetMessage(),
                        Severity = d.Severity.ToString(),
                        Location = d.Location == Location.None
                            ? "Unknown"
                            : d.Location.GetLineSpan().ToString()
                    })
                    .ToArray();
            }
            else
            {
                var references = AppContext
     .GetData("TRUSTED_PLATFORM_ASSEMBLIES")!
     .ToString()!
     .Split(Path.PathSeparator)
     .Select(path => MetadataReference.CreateFromFile(path))
     .ToList();

                var inMemoryCompilation = CSharpCompilation.Create(
     assemblyName: "InMemoryAnalysis",
     syntaxTrees: new[] { syntaxTree },
     references: references,
     options: new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));

                diagnostics = inMemoryCompilation
                    .GetDiagnostics()
                    .Select(d => new DiagnosticItem
                    {
                        Id = d.Id,
                        Message = d.GetMessage(),
                        Severity = d.Severity.ToString(),
                        Location = d.Location == Location.None
                            ? "Unknown"
                            : d.Location.GetLineSpan().ToString()
                    })
                    .ToArray();
            }

            return new FileAnalysisResult
            {
                FileName = fileName,
                RelativePath = relativePath,

                SyntaxAnalysis = new SyntaxAnalysisResult
                {
                    Classes = classCount,
                    Interfaces = interfaceCount,
                    Methods = methodCount,
                    Properties = propertyCount,
                    Fields = fieldCount
                },

                Diagnostics = diagnostics,

                SyntaxErrors = diagnostics
                    .Where(d =>
                        string.Equals(
                            d.Severity,
                            "Error",
                            StringComparison.OrdinalIgnoreCase))
                    .ToArray()
            };
        }
        catch (Exception ex)
        {
            return ErrorResult(
                fileName,
                relativePath,
                ex);
        }
    }
    private static FileAnalysisResult EmptyResult(
    string fileName,
    string relativePath)
    {
        return new FileAnalysisResult
        {
            FileName = fileName,
            RelativePath = relativePath,

            SyntaxAnalysis = new SyntaxAnalysisResult
            {
                Classes = 0,
                Interfaces = 0,
                Methods = 0,
                Properties = 0,
                Fields = 0
            },

            Diagnostics = Array.Empty<DiagnosticItem>(),

            SyntaxErrors = Array.Empty<DiagnosticItem>()
        };
    }
    private static FileAnalysisResult ErrorResult(
    string fileName,
    string relativePath,
    Exception exception)
    {
        var diagnostic = new DiagnosticItem
        {
            Id = "ROSLYN_ANALYSIS_ERROR",
            Message = exception.Message,
            Severity = "Error",
            Location = "Unknown"
        };

        return new FileAnalysisResult
        {
            FileName = fileName,
            RelativePath = relativePath,

            SyntaxAnalysis = new SyntaxAnalysisResult
            {
                Classes = 0,
                Interfaces = 0,
                Methods = 0,
                Properties = 0,
                Fields = 0
            },

            Diagnostics = new[]
            {
            diagnostic
        },

            SyntaxErrors = new[]
            {
            diagnostic
        }
        };
    }
    private CSharpCompilation GetOrCreateCompilation(string workspacePath)
    {
        var cache = compilationCacheByWorkspace.GetOrAdd(
            workspacePath,
            path => new Lazy<CompilationCache>(() => CreateCompilationCache(path)));

        return cache.Value.Compilation;
    }

    private static CompilationCache CreateCompilationCache(string workspacePath)
    {
        var syntaxTrees = Directory.EnumerateFiles(workspacePath, "*.cs", SearchOption.AllDirectories)
            .Select(filePath => CSharpSyntaxTree.ParseText(File.ReadAllText(filePath), new CSharpParseOptions(), filePath))
            .ToArray();

        var references = AppContext
    .GetData("TRUSTED_PLATFORM_ASSEMBLIES")!
    .ToString()!
    .Split(Path.PathSeparator)
    .Select(path => MetadataReference.CreateFromFile(path));

        var compilation = CSharpCompilation.Create(
            "TempCompilation",
            syntaxTrees: syntaxTrees,
            references: references,
            options: new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));

        return new CompilationCache(compilation);
    }

    private sealed record CompilationCache(CSharpCompilation Compilation);
}
