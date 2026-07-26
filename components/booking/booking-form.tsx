"use client";

import { useEffect, useMemo, useState } from "react";
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
    { id: "coucher-de-soleil", name: "Coucher de soleil", duration: "3 heures", price: "Dès 380 €" },
    { id: "apres-midi", name: "Après-midi", duration: "4 heures", price: "Dès 590 €" },
    { id: "journee", name: "Journée", duration: "8 heures", price: "Dès 990 €" },
  ],
  nuit: [{ id: "nuit-insolite", name: "Nuit insolite", duration: "18h00 → 10h00", price: "Dès 450 €" }],
};

const STEPS = ["Votre envie", "Votre moment", "Votre date", "Faisons connaissance"];

/* Les surfaces du formulaire lisent l'ambiance de la page : quand le visiteur
   choisit la nuit, tout glisse vers le mouillage sans qu'une seule classe
   change ici. */
const SURFACE = "bg-[color:var(--amb-surface)]";
const INK = "text-[color:var(--amb-ink)]";
const INK_SOFT = "text-[color:var(--amb-ink-soft)]";
const INK_FAINT = "text-[color:var(--amb-ink-faint)]";
const ACCENT = "text-[color:var(--amb-accent)]";
const LINE = "border-[color:var(--amb-line)]";

const LABEL = cn("text-xs font-semibold uppercase tracking-[0.2em]", INK_SOFT);
const FIELD = cn(
  "mt-2 w-full border bg-transparent px-4 py-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amb-accent)]/40",
  LINE,
  INK,
  "placeholder:text-[color:var(--amb-ink-faint)] focus:border-[color:var(--amb-accent)]"
);

function formatDate(date: Date) {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BookingForm({
  onExperienceChange,
}: {
  /** Remonte le choix pour que la page entière change de lumière. */
  onExperienceChange?: (experience: Experience | null) => void;
}) {
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

  // Un lien « Réserver ma nuit » doit ouvrir la page déjà dans la nuit.
  useEffect(() => {
    onExperienceChange?.(experience);
  }, [experience, onExperienceChange]);

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

  /** Carte sélectionnable — s'inverse par rapport à la page, jour comme nuit. */
  const cardClass = (selected: boolean) =>
    cn(
      "border p-6 text-left transition-colors duration-300",
      selected
        ? "border-[color:var(--amb-selected-accent)] bg-[color:var(--amb-selected)] text-[color:var(--amb-selected-ink)]"
        : cn(LINE, SURFACE, INK, "hover:border-[color:var(--amb-accent)]")
    );

  if (submitted) {
    return (
      <div className={cn("border p-8 md:p-10", LINE, SURFACE)}>
        <p className={cn("font-script text-3xl", ACCENT)}>À très vite, {name.split(" ")[0]}</p>
        <h2 className={cn("mt-3 font-serif text-2xl", INK)}>On garde votre place à bord.</h2>
        <p className={cn("mt-4 max-w-lg text-sm leading-relaxed", INK_SOFT)}>
          Votre messagerie s&apos;est ouverte avec le mot déjà écrit — il ne
          reste qu&apos;à l&apos;envoyer. Le capitaine consulte la météo et vous
          répond avant demain soir. Pas d&apos;application mail sur cet
          appareil ? Copiez le mot ci-dessous et glissez-le nous en message sur
          Instagram <span className={cn("font-semibold", INK)}>{CONTACT.instagram}</span>.
        </p>
        <pre
          className={cn(
            "mt-6 max-h-64 overflow-auto whitespace-pre-wrap border p-5 font-sans text-xs leading-relaxed",
            LINE,
            INK_SOFT
          )}
        >
          {recap}
        </pre>
        <button
          type="button"
          onClick={copyRecap}
          className={cn(
            "mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-70",
            ACCENT
          )}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copié !" : "Copier le mot"}
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
              i === step ? ACCENT : i < step ? INK_SOFT : INK_FAINT
            )}
          >
            <span className="font-serif text-base italic tabular-nums">0{i + 1}</span>
            {label}
            {i < step && <Check size={13} className={ACCENT} />}
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
                      text: "EVJF, anniversaire, entreprise — jusqu'à 10 personnes.",
                      price: "Dès 380 €",
                    },
                    {
                      id: "nuit" as const,
                      icon: Moon,
                      title: "Nuit insolite",
                      text: "À deux, du coucher de soleil au petit-déjeuner.",
                      price: "Dès 450 €",
                    },
                  ]
                ).map(({ id, icon: Icon, title, text, price }) => {
                  const selected = experience === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setExperience(id);
                        if (id === "nuit") setFormuleId("nuit-insolite");
                        else if (formuleId === "nuit-insolite") setFormuleId(null);
                      }}
                      aria-pressed={selected}
                      className={cardClass(selected)}
                    >
                      <Icon
                        size={26}
                        strokeWidth={1.5}
                        className={
                          selected ? "text-[color:var(--amb-selected-accent)]" : ACCENT
                        }
                      />
                      <p className="mt-4 font-serif text-xl">{title}</p>
                      <p
                        className={cn(
                          "mt-2 text-sm leading-relaxed",
                          selected ? "text-[color:var(--amb-selected-soft)]" : INK_SOFT
                        )}
                      >
                        {text}
                      </p>
                      <p
                        className={cn(
                          "mt-3 text-xs font-semibold uppercase tracking-[0.2em]",
                          selected ? "text-[color:var(--amb-selected-accent)]" : ACCENT
                        )}
                      >
                        {price}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-3">
                {formules.map((f) => {
                  const selected = formuleId === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormuleId(f.id)}
                      aria-pressed={selected}
                      className={cardClass(selected)}
                    >
                      <p
                        className={cn(
                          "text-xs font-semibold uppercase tracking-[0.2em]",
                          selected ? "text-[color:var(--amb-selected-soft)]" : INK_SOFT
                        )}
                      >
                        {f.duration}
                      </p>
                      <p className="mt-2 font-serif text-xl">{f.name}</p>
                      <p
                        className={cn(
                          "mt-2 font-serif text-lg",
                          selected ? "text-[color:var(--amb-selected-accent)]" : ACCENT
                        )}
                      >
                        {f.price}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
                <Calendar selected={date} onSelect={setDate} />
                <div>
                  {date && (
                    <p className={cn("font-serif text-lg italic", INK)}>{formatDate(date)}</p>
                  )}
                  {experience === "jour" ? (
                    <div className="mt-6">
                      <p className={LABEL}>Nombre de personnes</p>
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
                                : cn(LINE, INK, "hover:border-[color:var(--amb-accent)]")
                            )}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className={cn("mt-6 text-sm leading-relaxed", INK_SOFT)}>
                      La nuit insolite est une expérience pour 2 personnes.
                    </p>
                  )}
                  <p className={cn("mt-6 text-xs leading-relaxed", INK_FAINT)}>
                    La date reste une demande : nous confirmons la disponibilité
                    sous 24h. Report gratuit en cas de météo défavorable.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="bk-name" className={LABEL}>
                      Nom
                    </label>
                    <input
                      id="bk-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Votre nom"
                      className={FIELD}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bk-phone" className={LABEL}>
                        Téléphone
                      </label>
                      <input
                        id="bk-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="06 00 00 00 00"
                        className={FIELD}
                      />
                    </div>
                    <div>
                      <label htmlFor="bk-email" className={LABEL}>
                        Email
                      </label>
                      <input
                        id="bk-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vous@exemple.fr"
                        className={FIELD}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bk-message" className={LABEL}>
                      Un mot sur l&apos;occasion{" "}
                      <span className={cn("font-normal normal-case tracking-normal", INK_FAINT)}>
                        (optionnel)
                      </span>
                    </label>
                    <textarea
                      id="bk-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Anniversaire surprise, demande spéciale, options traiteur..."
                      className={FIELD}
                    />
                  </div>
                </div>

                <aside className={cn("h-fit border p-6", LINE, SURFACE)}>
                  <p className={LABEL}>Votre traversée</p>
                  <ul className={cn("mt-4 space-y-3 text-sm", INK)}>
                    <li className="flex justify-between gap-4">
                      <span className={INK_SOFT}>Expérience</span>
                      <span className="text-right font-medium">
                        {experience === "jour" ? "Sortie en mer" : "Nuit insolite"}
                      </span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className={INK_SOFT}>Formule</span>
                      <span className="text-right font-medium">{formule?.name}</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className={INK_SOFT}>Date</span>
                      <span className="text-right font-medium">
                        {date ? formatDate(date) : "—"}
                      </span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className={INK_SOFT}>Personnes</span>
                      <span className="text-right font-medium">
                        {experience === "nuit" ? 2 : guests}
                      </span>
                    </li>
                    <li className={cn("flex justify-between gap-4 border-t pt-3", LINE)}>
                      <span className={INK_SOFT}>Tarif</span>
                      <span className={cn("text-right font-serif text-lg", ACCENT)}>
                        {formule?.price}
                      </span>
                    </li>
                  </ul>
                  <p className={cn("mt-4 text-[0.65rem] leading-relaxed", INK_FAINT)}>
                    Capitaine &amp; carburant inclus. Confirmation sous 24h,
                    report gratuit en cas de météo défavorable.
                  </p>
                </aside>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={cn("mt-10 flex items-center justify-between border-t pt-6", LINE)}>
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-70",
            INK_SOFT,
            step === 0 && "invisible"
          )}
        >
          ← Retour
        </button>
        {step < 3 ? (
          <Button type="button" variant="primary" disabled={!canContinue} onClick={goNext}>
            Continuer
          </Button>
        ) : (
          <Button type="button" variant="primary" disabled={!canContinue} onClick={handleSubmit}>
            Demander cette date
          </Button>
        )}
      </div>
    </div>
  );
}
