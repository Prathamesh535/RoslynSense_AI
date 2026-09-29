namespace CodeGuard.API.Models.Requests
{
    public sealed class PasteCodeRequest
    {
        public string Code { get; init; } = "";

        public string Provider { get; init; } = "openrouter";

        public string Model { get; init; } = "";

        public double Temperature { get; init; } = 0.2;

        public int MaxTokens { get; init; } = 4000;
        public string FileName { get; init; } = "PastedFile.cs";
    }
}
