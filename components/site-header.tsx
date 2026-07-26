"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Monogram } from "@/components/monogram";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        // Hors accueil, l'en-tête prend la lumière de la page (identique au sable
        // partout, sauf sur la réservation qui bascule jour/nuit).
        transparent
          ? "bg-transparent"
          : "amb-header-bg backdrop-blur-sm shadow-[0_1px_0_0_var(--amb-line)]"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 transition-colors duration-500",
            transparent ? "text-sable" : "text-[color:var(--amb-ink)]"
          )}
        >
          <Monogram
            className={cn(
              "h-8 w-8 shrink-0",
              transparent ? "text-brass" : "text-[color:var(--amb-accent)]"
            )}
          />
          <span className="font-serif text-lg tracking-[0.2em] uppercase">
            Harmonie{" "}
            <span className={transparent ? "text-brass" : "text-[color:var(--amb-accent)]"}>
              Yacht
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors duration-300",
                transparent
                  ? "text-sable/90 hover:text-brass"
                  : "text-[color:var(--amb-ink-soft)] hover:text-[color:var(--amb-accent)]",
                pathname === link.href &&
                  (transparent ? "text-brass" : "text-[color:var(--amb-accent)]")
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/reserver" variant="primary" className="text-xs">
            Réserver
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={cn(
            "lg:hidden -mr-2.5 inline-flex h-11 w-11 items-center justify-center transition-colors duration-300",
            transparent ? "text-sable" : "text-[color:var(--amb-ink)]"
          )}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden overflow-hidden bg-[color:var(--amb-page)] transition-[max-height,opacity] duration-300 ease-out",
          menuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container flex flex-col gap-1 pb-8 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "py-3 text-base font-medium border-b border-[color:var(--amb-line)] text-[color:var(--amb-ink)]",
                pathname === link.href && "text-[color:var(--amb-accent)]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/reserver" variant="primary" className="mt-5 w-full">
            Réserver
          </Button>
        </nav>
      </div>
    </header>
  );
}
