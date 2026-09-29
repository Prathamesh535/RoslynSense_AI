using RoslynSense.API.AI.Interfaces;

namespace RoslynSense.API.AI.Factory;

public interface IAIProviderFactory
{
    IAIProvider GetProvider(string provider);
}