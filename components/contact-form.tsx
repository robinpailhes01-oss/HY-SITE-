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

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `Demande de réservation — ${data.get("occasion") ?? "Harmonie Yacht"}`
    );
    const body = encodeURIComponent(
      `Nom : ${data.get("name")}\nTéléphone : ${data.get("phone")}\nDate souhaitée : ${data.get("date")}\nOccasion : ${data.get("occasion")}\n\nMessage :\n${data.get("message")}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-brass/40 bg-sable-50 p-8 text-center">
        <p className="font-serif text-xl text-marine">Merci !</p>
        <p className="mt-3 text-sm leading-relaxed text-marine/70">
          Votre messagerie s&apos;est ouverte avec votre demande pré-remplie
          — il ne reste plus qu&apos;à l&apos;envoyer. Vous pouvez aussi nous
          écrire directement à{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-brass-400 underline">
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
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full border border-marine/20 bg-transparent px-4 py-3 text-sm text-marine placeholder:text-marine/65 transition-colors focus:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/40"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-2 w-full border border-marine/20 bg-transparent px-4 py-3 text-sm text-marine placeholder:text-marine/65 transition-colors focus:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/40"
            placeholder="06 00 00 00 00"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="occasion" className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
            Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            required
            defaultValue=""
            className="mt-2 w-full border border-marine/20 bg-transparent px-4 py-3 text-sm text-marine transition-colors focus:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/40"
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
          <label htmlFor="date" className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
            Date souhaitée{" "}
            <span className="font-normal normal-case tracking-normal text-marine/65">(optionnel)</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="mt-2 w-full border border-marine/20 bg-transparent px-4 py-3 text-sm text-marine transition-colors focus:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/40"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full border border-marine/20 bg-transparent px-4 py-3 text-sm text-marine placeholder:text-marine/40 focus:border-brass focus:outline-none"
          placeholder="Nombre de personnes, durée souhaitée, occasion..."
        />
      </div>

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Envoyer la demande
      </Button>
    </form>
  );
}
