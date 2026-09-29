using CodeGuard.API.AI.Interfaces;

namespace CodeGuard.API.AI.Factory;

public interface IAIProviderFactory
{
    IAIProvider GetProvider(string provider);
}