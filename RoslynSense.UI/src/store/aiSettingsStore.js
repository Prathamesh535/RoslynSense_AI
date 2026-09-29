// import { create } from "zustand";

// export const useAISettingsStore = create((set) => ({

//     providers: [],
//     models: [],

//     provider: "",
//     model: "",

//     temperature: 0.2,
//     maxTokens: 2048,

//     setProviders: (providers) =>
//         set({ providers }),

//     setModels: (models) =>
//         set({ models }),

//     setProvider: (provider) =>
//         set({ provider }),

//     setModel: (model) =>
//         set({ model }),

//     setTemperature: (temperature) =>
//         set({ temperature }),

//     setMaxTokens: (maxTokens) =>
//         set({ maxTokens })
// }));

// aiSettingsStore.js

import { create } from "zustand";

export const useAISettingsStore = create((set) => ({
  provider: "openrouter",
  model: "qwen/qwen3-coder",

  providers: [],   // 🔥 REQUIRED
  models: [],      // 🔥 REQUIRED

  temperature: 0.2,
  maxTokens: 2000,

  setProviders: (providers) => set({ providers }),
  setModels: (models) => set({ models }),

  setProvider: (provider) => set({ provider }),
  setModel: (model) => set({ model }),

  setTemperature: (temperature) => set({ temperature }),
  setMaxTokens: (maxTokens) => set({ maxTokens }),
}));