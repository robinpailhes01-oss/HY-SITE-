"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Vidéo de hero : rendue uniquement si le fichier existe (vérifié au build
 * par le composant serveur parent). Se fond par-dessus la photo une fois
 * prête ; jamais rendue quand l'utilisateur préfère les animations réduites.
 */
export function HeroVideo({ src = "/videos/hero.mp4" }: { src?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return null;

  return (
    <video
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
        ready ? "opacity-100" : "opacity-0"
      )}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onCanPlay={() => setReady(true)}
      aria-hidden="true"
    />
  );
}
