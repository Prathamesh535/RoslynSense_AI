import { useEffect } from "react";

import { getProviders, getModels }
    from "../../services/aiService";

import { useAISettingsStore }
    from "../../store/aiSettingsStore";

export default function AISettingsDialog({

    open,
    onClose
}) {
    const {

        providers,
        models,

        provider,
        model,

        temperature,
        maxTokens,

        setProviders,
        setModels,

        setProvider,
        setModel,

        setTemperature,
        setMaxTokens

    } = useAISettingsStore();

    useEffect(() => {
    if (!providers || providers.length === 0) {
        loadProviders();
    }
}, []);

useEffect(() => {
    if (!provider) return;
    loadModels(provider);
}, [provider]);

    const loadProviders = async () => {

        const data = await getProviders();

        setProviders(data);

        if (data.length > 0) {

            setProvider(data[0].id);

        }

    };

   const loadModels = async (provider) => {

    let data = await getModels(provider);

    // ✅ Inject Qwen if missing
    const qwenExists = data.some(
        x => x.id === "qwen/qwen3-coder"
    );

    if (!qwenExists) {
        data = [
            {
                id: "qwen/qwen3-coder",
                name: "Qwen3 Coder (Free)"
            },
            ...data
        ];
    }

    setModels(data);

    const currentModel = useAISettingsStore.getState().model;

    // ✅ Only set if empty
    if (!currentModel && data.length > 0) {
        setModel("qwen/qwen3-coder");
    }
};
     if (!open)
        return null;
    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            <div className="w-[520px] rounded-2xl border border-zinc-800 bg-[#171717] shadow-2xl">

                <div className="border-b border-zinc-800 px-6 py-4">

                    <h2 className="text-lg font-semibold">
                        AI Settings
                    </h2>

                </div>

                <div className="space-y-5 p-6">

                    <div>

                        <label className="mb-2 block text-sm text-zinc-400">
                            Provider
                        </label>

                        <select
                            className="w-full rounded-lg border border-zinc-700 bg-[#111113] p-3"
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                        >
                            {(providers || []).map((x) => (
                                <option
                                    key={x.id}
                                    value={x.id}
                                >
                                    {x.name}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div>

                        <label className="mb-2 block text-sm text-zinc-400">
                            Model
                        </label>

                        <select
                            className="w-full rounded-lg border border-zinc-700 bg-[#111113] p-3"
                            value={model || "qwen/qwen3-coder"}
                            onChange={(e) => setModel(e.target.value)}
                        >
                           {(models || []).map((x) => (
                                <option
                                    key={x.id}
                                    value={x.id}
                                >
                                    {x.name}
                                </option>
                            ))}
                        </select>

                    </div>
                   
                    <div>

                        <label className="mb-2 block text-sm text-zinc-400">

                            Temperature

                        </label>

                        <input
                            type="number"
                            step="0.1"
                            value={temperature}
                            onChange={(e) => setTemperature(Number(e.target.value))}
                            className="w-full rounded-lg border border-zinc-700 bg-[#111113] p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-zinc-400">

                            Max Tokens

                        </label>

                        <input
                            type="number"
                            value={maxTokens}
                            onChange={(e) => setMaxTokens(Number(e.target.value))}
                            className="w-full rounded-lg border border-zinc-700 bg-[#111113] p-3"
                        />

                    </div>

                </div>

                <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg border border-zinc-700 px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button onClick={onClose}
                        className="rounded-lg bg-violet-600 px-5 py-2 hover:bg-violet-500"
                    >
                        Done
                    </button>

                </div>

            </div>

        </div>

    );
}