"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const DAYS = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (date: Date) => void;
}) {
  const today = startOfDay(new Date());
  const [month, setMonth] = useState(
    () => new Date((selected ?? today).getFullYear(), (selected ?? today).getMonth(), 1)
  );

  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const firstOffset = (month.getDay() + 6) % 7; // semaine commençant lundi
  const isCurrentMonth =
    month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();

  const cells: (Date | null)[] = [
    ...Array.from({ length: firstOffset }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)
    ),
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          disabled={isCurrentMonth}
          aria-label="Mois précédent"
          className="flex h-10 w-10 items-center justify-center text-[color:var(--amb-ink-soft)] transition-colors hover:text-[color:var(--amb-accent)] disabled:opacity-25"
        >
          <ChevronLeft size={20} />
        </button>
        <p className="font-serif text-lg text-[color:var(--amb-ink)]">
          {MONTHS[month.getMonth()]}{" "}
          <span className="text-[color:var(--amb-ink-soft)]">{month.getFullYear()}</span>
        </p>
        <button
          type="button"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          aria-label="Mois suivant"
          className="flex h-10 w-10 items-center justify-center text-[color:var(--amb-ink-soft)] transition-colors hover:text-[color:var(--amb-accent)]"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 text-center">
        {DAYS.map((day) => (
          <span
            key={day}
            className="pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--amb-ink-faint)]"
          >
            {day}
          </span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={`empty-${i}`} />;
          const isPast = date < today;
          const isSelected = selected !== null && isSameDay(date, selected);
          const isToday = isSameDay(date, today);
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(date)}
              aria-label={`Choisir le ${date.getDate()} ${MONTHS[date.getMonth()]}`}
              aria-pressed={isSelected}
              className={cn(
                "mx-auto flex h-10 w-10 items-center justify-center rounded-full font-serif text-sm tabular-nums transition-colors",
                isPast && "text-[color:var(--amb-ink-faint)] opacity-40",
                !isPast && !isSelected && "text-[color:var(--amb-ink)] hover:bg-brass/20",
                isToday && !isSelected && "border border-brass/50",
                isSelected && "bg-brass text-marine-300"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
