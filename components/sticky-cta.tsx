"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-sable/15 bg-marine-400/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm md:hidden"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-serif text-sm text-sable">À partir de 390 €</p>
              <p className="truncate text-[0.65rem] uppercase tracking-[0.15em] text-sable/60">
                Capitaine inclus · Report météo gratuit
              </p>
            </div>
            <Button href="/contact" variant="primary" className="shrink-0 px-5 py-2.5 text-[0.7rem]">
              Réserver
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
