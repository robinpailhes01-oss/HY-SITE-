"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/nav";
import { Button } from "@/components/ui/button";

const OCCASIONS = [
  "Sortie EVJF",
  "Anniversaire",
  "Événement d'entreprise",
  "Nuit insolite",
  "Autre",
];

/* La page contact se joue au crépuscule : le formulaire est écrit pour le
   fond sombre, pas décliné depuis une version claire. */
const LABEL = "text-xs font-semibold uppercase tracking-[0.2em] text-sable/70";
const FIELD =
  "mt-2 w-full border border-sable/25 bg-sable/[0.04] px-4 py-3 text-sm text-sable placeholder:text-sable/45 transition-colors focus:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass/40";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `Message — ${data.get("occasion") ?? "Harmonie Yacht"}`
    );
    const body = encodeURIComponent(
      `Nom : ${data.get("name")}\nTéléphone : ${data.get("phone")}\nDate souhaitée : ${data.get("date")}\nOccasion : ${data.get("occasion")}\n\nMessage :\n${data.get("message")}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-brass/40 bg-sable/[0.05] p-8 text-center">
        <p className="font-script text-3xl leading-none text-brass">Merci</p>
        <p className="mt-4 text-sm leading-relaxed text-sable/75">
          Votre messagerie s&apos;est ouverte avec le message déjà écrit — il ne
          reste qu&apos;à l&apos;envoyer. Vous pouvez aussi nous écrire
          directement à{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-brass underline">
            {CONTACT.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={FIELD}
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="phone" className={LABEL}>
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={FIELD}
            placeholder="06 00 00 00 00"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="occasion" className={LABEL}>
            Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            required
            defaultValue=""
            className={`${FIELD} [&>option]:bg-marine [&>option]:text-sable`}
          >
            <option value="" disabled>
              Choisissez une occasion
            </option>
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={LABEL}>
            Date souhaitée{" "}
            <span className="font-normal normal-case tracking-normal text-sable/50">
              (optionnel)
            </span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className={`${FIELD} [color-scheme:dark]`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={FIELD}
          placeholder="Nombre de personnes, durée souhaitée, occasion..."
        />
      </div>

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Envoyer le message
      </Button>
    </form>
  );
}
