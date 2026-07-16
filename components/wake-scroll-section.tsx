"use client";

import { useRef } from "react";
import { WakeLine } from "@/components/wake-line";

export function WakeScrollSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative">
      <WakeLine
        containerRef={ref}
        className="pointer-events-none absolute left-6 top-0 hidden h-full w-1 text-brass/50 md:left-12 md:block"
      />
      {children}
    </div>
  );
}
