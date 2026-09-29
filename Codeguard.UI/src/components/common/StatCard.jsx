import React from "react";

export default function StatCard({
  label,
  value,
  subValue,
  color = "text-white",
  icon,
}) {
  return (
    <div className="flex h-[62px] items-center justify-between rounded-lg border border-zinc-800 bg-[#111113] px-3 transition-all duration-200 hover:border-violet-500 hover:bg-[#16161A]">

      <div className="min-w-0">

        <p className="text-[10px] uppercase tracking-[1px] text-zinc-500">
          {label}
        </p>

        <div className="mt-1 flex items-end gap-2">

          <span className={`text-xl font-semibold leading-none ${color}`}>
            {value}
          </span>

          {subValue && (
            <span className="pb-[2px] text-[10px] text-zinc-500 truncate">
              {subValue}
            </span>
          )}

        </div>

      </div>

      {icon && (
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-zinc-400">
          {icon}
        </div>
      )}

    </div>
  );
}