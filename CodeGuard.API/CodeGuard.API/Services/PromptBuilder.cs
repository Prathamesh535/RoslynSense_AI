using CodeGuard.API.Interfaces;
using CodeGuard.API.Models.Requests;

namespace CodeGuard.API.Services;

public sealed class PromptBuilder : IPromptBuilder
{
    public string Build(AIReviewRequest request)
    {
        return string.Format("""
You are an expert C# Senior Software Engineer.

You are given ONLY the C# code block that contains the compiler or analyzer issue.

Your task is to fix ONLY this code block.

Return ONLY one valid JSON object.

Rules:
- Output ONLY JSON.
- Do NOT use markdown.
- Do NOT wrap the JSON in ```json.
- Do NOT add explanations before or after the JSON.
- Ensure the JSON is complete and properly closed.
- Escape all quotes inside string values.
- Do NOT modify code outside the supplied code block.
- Preserve formatting whenever possible.
- The "optimizedCode" property must contain ONLY the corrected code block.

The JSON schema is:

{{
  "ruleId": "",
  "title": "",
  "explanation": "",
  "whyItMatters": "",
  "minimalFix": "",
  "optimizedCode": "",
  "timeComplexity": "",
  "spaceComplexity": "",
  "improvements": [],
  "canAutoApply": true
}}

Compiler Rule:
{0}

Compiler Message:
{1}

Issue Line:
{2}

Roslyn Analysis:
{3}

File:
{4}

Code Block To Fix:

{5}
""",
            request.RuleId,
            request.DiagnosticMessage,
            request.LineNumber,
            request.RoslynAnalysis,
            request.FileName,
            request.SourceCode);
    }
}