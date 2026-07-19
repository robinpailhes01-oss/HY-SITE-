"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Moon, Sun } from "lucide-react";
import { Calendar } from "@/components/booking/calendar";
import { Button } from "@/components/ui/button";
import { ReviewToast } from "@/components/reviews/review-toast";
import { CONTACT } from "@/lib/nav";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Experience = "jour" | "nuit";

interface Formule {
  id: string;
  name: string;
  duration: string;
  price: string;
}

const FORMULES: Record<Experience, Formule[]> = {
  jour: [
    { id: "coucher-de-soleil", name: "Coucher de soleil", duration: "3 heures", price: "Dès 390 €" },
    { id: "apres-midi", name: "Après-midi", duration: "4 heures", price: "Dès 590 €" },
    { id: "journee", name: "Journée", duration: "8 heures", price: "Dès 990 €" },
  ],
  nuit: [
    { id: "nuit-insolite", name: "Nuit insolite", duration: "18h00 → 10h00", price: "Dès 450 €" },
  ],
};

const STEPS = ["L'expérience", "La formule", "La date", "Vos coordonnées"];

function formatDate(date: Date) {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BookingForm() {
  const params = useSearchParams();
  const initialExperience: Experience | null =
    params.get("experience") === "nuit"
      ? "nuit"
      : params.get("experience") === "jour"
        ? "jour"
        : null;
  const initialFormule = params.get("formule");

  const [step, setStep] = useState(0);
  const [experience, setExperience] = useState<Experience | null>(initialExperience);
  const [formuleId, setFormuleId] = useState<string | null>(initialFormule);
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const formules = experience ? FORMULES[experience] : [];
  const formule = formules.find((f) => f.id === formuleId) ?? null;

  const recap = useMemo(() => {
    if (!experience || !formule || !date) return "";
    return [
      `Demande de réservation — Harmonie Yacht`,
      ``,
      `Expérience : ${experience === "jour" ? "Sortie en mer (jour)" : "Nuit insolite"}`,
      `Formule : ${formule.name} (${formule.duration}) — ${formule.price}`,
      `Date souhaitée : ${formatDate(date)}`,
      `Nombre de personnes : ${experience === "nuit" ? 2 : (guests ?? "à préciser")}`,
      ``,
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Email : ${email}`,
      message ? `\nMessage :\n${message}` : "",
    ].join("\n");
  }, [experience, formule, date, guests, name, phone, email, message]);

  const canContinue = [
    experience !== null,
    formule !== null,
    date !== null && (experience === "nuit" || guests !== null),
    name.trim() !== "" && phone.trim() !== "",
  ][step];

  function goNext() {
    if (step === 0 && experience === "nuit") {
      setFormuleId("nuit-insolite");
      setGuests(2);
    }
    setStep((s) => Math.min(s + 1, 3));
  }

  function handleSubmit() {
    const subject = encodeURIComponent(
      `Réservation — ${formule?.name ?? "Harmonie Yacht"} — ${date ? formatDate(date) : ""}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(recap)}`;
    setSubmitted(true);
  }

  async function copyRecap() {
    try {
      await navigator.clipboard.writeText(recap);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponible : le récap reste lisible à l'écran */
    }
  }

  if (submitted) {
    return (
      <div className="border border-brass/40 bg-sable-50 p-8 md:p-10">
        <p className="font-script text-3xl text-brass-400">Merci {name.split(" ")[0]} !</p>
        <h2 className="mt-3 font-serif text-2xl text-marine">
          Votre demande est prête à nous parvenir.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-marine/70">
          Votre messagerie s&apos;est ouverte avec la demande pré-remplie — il ne
          reste qu&apos;à l&apos;envoyer. Nous confirmons la disponibilité sous
          24h. Pas d&apos;application mail sur cet appareil ? Copiez le
          récapitulatif ci-dessous et envoyez-le nous sur Instagram{" "}
          <span className="font-semibold text-marine">{CONTACT.instagram}</span>.
        </p>
        <pre className="mt-6 max-h-64 overflow-auto whitespace-pre-wrap border border-marine/10 bg-sable p-5 font-sans text-xs leading-relaxed text-marine/80">
          {recap}
        </pre>
        <button
          type="button"
          onClick={copyRecap}
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-400 transition-colors hover:text-terracotta-300"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copié !" : "Copier le récapitulatif"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <ReviewToast step={step} experience={experience} active={!submitted} />

      {/* Progression */}
      <ol className="flex flex-wrap gap-x-6 gap-y-2">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={cn(
              "flex items-baseline gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors sm:text-xs",
              i === step ? "text-brass-400" : i < step ? "text-marine/70" : "text-marine/35"
            )}
          >
            <span className="font-serif text-base italic tabular-nums">0{i + 1}</span>
            {label}
            {i < step && <Check size={13} className="text-brass-400" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    {
                      id: "jour" as const,
                      icon: Sun,
                      title: "Sortie en mer",
                      text: "EVJF, anniversaire, entreprise — jusqu'à 12 personnes.",
                      price: "Dès 390 €",
                    },
                    {
                      id: "nuit" as const,
                      icon: Moon,
                      title: "Nuit insolite",
                      text: "À deux, du coucher de soleil au petit-déjeuner.",
                      price: "Dès 450 €",
                    },
                  ]
                ).map(({ id, icon: Icon, title, text, price }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setExperience(id);
                      if (id === "nuit") setFormuleId("nuit-insolite");
                      else if (formuleId === "nuit-insolite") setFormuleId(null);
                    }}
                    aria-pressed={experience === id}
                    className={cn(
                      "border p-6 text-left transition-colors",
                      experience === id
                        ? "border-brass bg-marine text-sable"
                        : "border-marine/15 bg-sable-50 text-marine hover:border-brass/60"
                    )}
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.5}
                      className={experience === id ? "text-brass" : "text-brass-400"}
                    />
                    <p className="mt-4 font-serif text-xl">{title}</p>
                    <p className={cn("mt-2 text-sm leading-relaxed", experience === id ? "text-sable/75" : "text-marine/65")}>
                      {text}
                    </p>
                    <p className={cn("mt-3 text-xs font-semibold uppercase tracking-[0.2em]", experience === id ? "text-brass" : "text-brass-400")}>
                      {price}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-3">
                {formules.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormuleId(f.id)}
                    aria-pressed={formuleId === f.id}
                    className={cn(
                      "border p-6 text-left transition-colors",
                      formuleId === f.id
                        ? "border-brass bg-marine text-sable"
                        : "border-marine/15 bg-sable-50 text-marine hover:border-brass/60"
                    )}
                  >
                    <p className={cn("text-xs font-semibold uppercase tracking-[0.2em]", formuleId === f.id ? "text-brass" : "text-marine/60")}>
                      {f.duration}
                    </p>
                    <p className="mt-2 font-serif text-xl">{f.name}</p>
                    <p className={cn("mt-2 font-serif text-lg", formuleId === f.id ? "text-brass" : "text-brass-400")}>
                      {f.price}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
                <Calendar selected={date} onSelect={setDate} />
                <div>
                  {date && (
                    <p className="font-serif text-lg italic text-marine">
                      {formatDate(date)}
                    </p>
                  )}
                  {experience === "jour" ? (
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
                        Nombre de personnes
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {Array.from({ length: 11 }, (_, i) => i + 2).map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setGuests(n)}
                            aria-label={`${n} personnes`}
                            aria-pressed={guests === n}
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-full border font-serif text-sm tabular-nums transition-colors",
                              guests === n
                                ? "border-brass bg-brass text-marine-300"
                                : "border-marine/20 text-marine hover:border-brass/60"
                            )}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-6 text-sm leading-relaxed text-marine/65">
                      La nuit insolite est une expérience pour 2 personnes.
                    </p>
                  )}
                  <p className="mt-6 text-xs leading-relaxed text-marine/55">
                    La date reste une demande : nous confirmons la
                    disponibilité sous 24h. Report gratuit en cas de météo
                    défavorable.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="bk-name" className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
                      Nom
                    </label>
                    <input
                      id="bk-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Votre nom"
                      className="mt-2 w-full border border-marine/20 bg-transparent px-4 py-3 text-sm text-marine placeholder:text-marine/65 transition-colors focus:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/40"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bk-phone" className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
                        Téléphone
                      </label>
                      <input
                        id="bk-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="06 00 00 00 00"
                        className="mt-2 w-full border border-marine/20 bg-transparent px-4 py-3 text-sm text-marine placeholder:text-marine/65 transition-colors focus:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="bk-email" className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
                        Email
                      </label>
                      <input
                        id="bk-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vous@exemple.fr"
                        className="mt-2 w-full border border-marine/20 bg-transparent px-4 py-3 text-sm text-marine placeholder:text-marine/65 transition-colors focus:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bk-message" className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
                      Un mot sur l&apos;occasion{" "}
                      <span className="font-normal normal-case tracking-normal text-marine/65">(optionnel)</span>
                    </label>
                    <textarea
                      id="bk-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Anniversaire surprise, demande spéciale, options traiteur..."
                      className="mt-2 w-full border border-marine/20 bg-transparent px-4 py-3 text-sm text-marine placeholder:text-marine/65 transition-colors focus:border-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/40"
                    />
                  </div>
                </div>

                <aside className="h-fit border border-marine/10 bg-sable-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
                    Votre traversée
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-marine/80">
                    <li className="flex justify-between gap-4">
                      <span className="text-marine/60">Expérience</span>
                      <span className="text-right font-medium">
                        {experience === "jour" ? "Sortie en mer" : "Nuit insolite"}
                      </span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-marine/60">Formule</span>
                      <span className="text-right font-medium">{formule?.name}</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-marine/60">Date</span>
                      <span className="text-right font-medium">{date ? formatDate(date) : "—"}</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-marine/60">Personnes</span>
                      <span className="text-right font-medium">
                        {experience === "nuit" ? 2 : guests}
                      </span>
                    </li>
                    <li className="flex justify-between gap-4 border-t border-marine/10 pt-3">
                      <span className="text-marine/60">Tarif</span>
                      <span className="text-right font-serif text-lg text-brass-400">
                        {formule?.price}
                      </span>
                    </li>
                  </ul>
                  <p className="mt-4 text-[0.65rem] leading-relaxed text-marine/55">
                    Capitaine & carburant inclus. Confirmation sous 24h, report
                    gratuit en cas de météo défavorable.
                  </p>
                </aside>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-marine/10 pt-6">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.2em] text-marine/60 transition-colors hover:text-marine",
            step === 0 && "invisible"
          )}
        >
          ← Retour
        </button>
        {step < 3 ? (
          <Button
            type="button"
            variant="primary"
            disabled={!canContinue}
            onClick={goNext}
          >
            Continuer
          </Button>
        ) : (
          <Button type="button" variant="primary" disabled={!canContinue} onClick={handleSubmit}>
            Envoyer ma demande
          </Button>
        )}
      </div>
    </div>
  );
}
