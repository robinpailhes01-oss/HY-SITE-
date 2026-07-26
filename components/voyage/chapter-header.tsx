import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface ChapterHeaderProps {
  /** Heure du journal de bord. Omise sur les pages qui ne sont pas un moment
      de la journée (le bateau, les tarifs) — le filet prend alors toute la place. */
  time?: string;
  chapter: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
}

export function ChapterHeader({ time, chapter, title, tone = "light", className }: ChapterHeaderProps) {
  const onDark = tone === "dark";

  return (
    <Reveal className={className}>
      {/* L'heure et le nom du chapitre sur une seule ligne discrète : le
          visiteur situe le moment sans que la page lui compte les heures. */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "h-px w-8 shrink-0",
            onDark ? "bg-brass/60" : "bg-brass-400/60"
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "text-[0.65rem] font-semibold uppercase tracking-[0.25em] sm:text-xs",
            onDark ? "text-brass" : "text-brass-400"
          )}
        >
          {time ? `${time} · ${chapter}` : chapter}
        </span>
      </div>
      <h2
        className={cn(
          "mt-5 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl",
          onDark ? "text-sable" : "text-marine"
        )}
      >
        {title}
      </h2>
    </Reveal>
  );
}
