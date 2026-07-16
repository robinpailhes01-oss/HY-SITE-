"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import { Button } from "@/components/ui/button";
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
        transparent ? "bg-transparent" : "bg-sable/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(16,27,46,0.08)]"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-serif text-lg tracking-[0.2em] uppercase transition-colors duration-500",
            transparent ? "text-sable" : "text-marine"
          )}
        >
          Harmonie <span className="text-brass">Yacht</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors duration-300",
                transparent ? "text-sable/90 hover:text-brass" : "text-marine/80 hover:text-brass",
                pathname === link.href && (transparent ? "text-brass" : "text-brass")
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary" className="text-xs">
            Réserver
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={cn(
            "lg:hidden inline-flex items-center justify-center p-2 -mr-2 transition-colors duration-300",
            transparent ? "text-sable" : "text-marine"
          )}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden overflow-hidden bg-sable transition-[max-height,opacity] duration-300 ease-out",
          menuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container flex flex-col gap-1 pb-8 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "py-3 text-base font-medium border-b border-marine/10 text-marine/90",
                pathname === link.href && "text-brass"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" className="mt-5 w-full">
            Réserver
          </Button>
        </nav>
      </div>
    </header>
  );
}
