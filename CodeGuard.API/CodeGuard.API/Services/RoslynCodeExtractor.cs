using CodeGuard.API.Models.Responses;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace CodeGuard.API.Services;

public sealed class RoslynCodeExtractor
{
    public CodeBlockExtractionResult? ExtractCodeBlock(
        string sourceCode,
        int lineNumber)
    {
        var tree = CSharpSyntaxTree.ParseText(sourceCode);

        var root = tree.GetRoot();

        // ==========================
        // Methods
        // ==========================

        foreach (var method in root.DescendantNodes().OfType<MethodDeclarationSyntax>())
        {
            var span = method.GetLocation().GetLineSpan();

            var start = span.StartLinePosition.Line + 1;

            var end = span.EndLinePosition.Line + 1;

            if (lineNumber >= start &&
                lineNumber <= end)
            {
                var type = method
                    .Ancestors()
                    .OfType<TypeDeclarationSyntax>()
                    .FirstOrDefault();

                return new CodeBlockExtractionResult
                {
                    BlockType = "Method",

                    BlockName = method.Identifier.Text,

                    ContainingType = type?.Identifier.Text ?? "",

                    Code = method.ToFullString(),

                    StartLine = start,

                    EndLine = end
                };
            }
        }

        return null;
    }
}