export default function Skeleton({
  className = "",
  rounded = "rounded-xl",
  animated = true,
}) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-zinc-800/80
        ${rounded}
        ${animated ? "animate-pulse" : ""}
        ${className}
      `}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}