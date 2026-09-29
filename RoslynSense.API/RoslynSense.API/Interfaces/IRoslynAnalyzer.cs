using RoslynSense.API.Models.Internal;

namespace RoslynSense.API.Interfaces;

public interface IRoslynAnalyzer
{
    FileAnalysisResult AnalyzeFile(
        SourceFile sourceFile,
        string workspacePath);

    FileAnalysisResult AnalyzeSourceCode(
        string fileName,
        string sourceCode);
}