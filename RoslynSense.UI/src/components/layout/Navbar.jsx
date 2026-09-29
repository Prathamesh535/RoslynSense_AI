import {
  Bell,
  ChevronDown,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  Bot,
} from "lucide-react";

import { useState } from "react";
import AISettingsDialog from "../ai/AISettingsDialog";
import { useAISettingsStore } from "../../store/aiSettingsStore";

export default function Navbar() {

  const [openAISettings, setOpenAISettings] = useState(false);

  return (
    <header className="h-16 border-b border-zinc-800 bg-[#0E0E10] px-6 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">

        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-700/20">

          <Sparkles size={20} className="text-white" />

        </div>

        <div>

          <h1 className="text-xl font-bold tracking-tight">
            RoslynSense AI
          </h1>

          <p className="text-xs text-zinc-500">
            Intelligent Code Review Platform
          </p>

        </div>

      </div>

      {/* Center */}
      <div className="hidden xl:flex flex-1 justify-center px-10">

        <div className="relative w-full max-w-xl">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search files, issues or functions... V2"
            className="w-full rounded-xl border border-zinc-800 bg-[#18181B] py-2.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-violet-600 focus:ring-2 focus:ring-violet-600/20"
          />

        </div>

      </div>
  
      {/* Right */}
      <div className="flex items-center gap-3">

        {/* AI Model */}
       
         <AISettingsDialog
    open={openAISettings}
    onClose={() => setOpenAISettings(false)}
/>
        <button
    onClick={() => setOpenAISettings(true)}
    className=" flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#18181B] px-4 py-2 text-sm hover:border-violet-600 transition">
    <Bot
        size={16}
        className="text-violet-400"
    />

    <span className="font-medium">
        AI Settings
    </span>

    <Settings
        size={15}
        className="text-zinc-400"
    />
</button>
</div> 

        {/* Notification */}
        <div> 
        <button className="relative rounded-xl border border-zinc-800 bg-[#18181B] p-2.5 hover:border-violet-600 transition">

          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Settings */}

        <button className="rounded-xl border border-zinc-800 bg-[#18181B] p-2.5 hover:border-violet-600 transition">

          <Settings size={18} />

        </button>

      </div>

    </header>
  );
}