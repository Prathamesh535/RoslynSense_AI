using CodeGuard.API.Models.Internal;

namespace CodeGuard.API.Interfaces;

public interface IRoslynAnalyzer
{
    FileAnalysisResult AnalyzeFile(
        SourceFile sourceFile,
        string workspacePath);

    FileAnalysisResult AnalyzeSourceCode(
        string fileName,
        string sourceCode);
}