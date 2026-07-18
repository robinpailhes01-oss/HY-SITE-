import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface ChapterHeaderProps {
  time: string;
  chapter: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
}

export function ChapterHeader({ time, chapter, title, tone = "light", className }: ChapterHeaderProps) {
  const onDark = tone === "dark";

  return (
    <Reveal className={className}>
      <div className="flex items-baseline gap-4">
        <span
          className={cn(
            "font-serif text-2xl italic tabular-nums md:text-3xl",
            onDark ? "text-brass" : "text-brass-400"
          )}
        >
          {time}
        </span>
        <span
          className={cn(
            "h-px flex-1 max-w-24",
            onDark ? "bg-sable/25" : "bg-marine/20"
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "text-[0.65rem] font-semibold uppercase tracking-[0.3em] sm:text-xs",
            onDark ? "text-sable/60" : "text-marine/60"
          )}
        >
          {chapter}
        </span>
      </div>
      <h2
        className={cn(
          "mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl",
          onDark ? "text-sable" : "text-marine"
        )}
      >
        {title}
      </h2>
    </Reveal>
  );
}
