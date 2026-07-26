"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { CONTACT } from "@/lib/nav";

/**
 * Contact WhatsApp direct, flottant sur toutes les pages.
 *
 * Apparaît après un court instant (jamais dès le premier écran, pour ne pas
 * concurrencer le hero) et reste discret : icône seule sur mobile, avec
 * l'argument « réponse en moins de 2 minutes » qui se déplie au survol sur
 * desktop. Au-dessus de la barre collante mobile, jamais superposé.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp — réponse en moins de 2 minutes"
      initial={{ opacity: 0, scale: 0.7, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed bottom-24 right-4 z-[70] flex items-center gap-2.5 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-marine-400 shadow-[0_8px_24px_rgba(7,12,21,0.28)] transition-[padding] duration-300 hover:pr-5 md:bottom-8 md:right-8"
    >
      <WhatsAppIcon size={26} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300 group-hover:max-w-[220px]">
        Réponse en moins de 2 minutes
      </span>
    </motion.a>
  );
}
