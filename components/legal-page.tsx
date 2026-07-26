import { Reveal } from "@/components/motion/reveal";

export interface LegalBlock {
  heading: string;
  /** Paragraphes. Une chaîne = un paragraphe ; un tableau = une liste. */
  body: (string | string[])[];
}

/**
 * Gabarit des pages légales. Volontairement dépouillé et sur fond clair : ces
 * pages se lisent, elles ne se contemplent pas. Elles restent dans la charte
 * (serif, filets laiton) sans emprunter la mise en scène du reste du site.
 */
export function LegalPage({
  title,
  intro,
  updatedAt,
  blocks,
}: {
  title: string;
  intro?: string;
  updatedAt?: string;
  blocks: LegalBlock[];
}) {
  return (
    <main className="bg-sable">
      <section className="pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="container max-w-2xl">
          <Reveal>
            <h1 className="font-serif text-3xl italic leading-tight text-marine sm:text-4xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 text-base leading-relaxed text-marine/70">{intro}</p>
            )}
            {updatedAt && (
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-marine/50">
                Dernière mise à jour : {updatedAt}
              </p>
            )}
          </Reveal>

          <div className="mt-14 space-y-12">
            {blocks.map((block) => (
              <Reveal key={block.heading}>
                <section>
                  <h2 className="border-t border-brass/40 pt-5 font-serif text-xl text-marine">
                    {block.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {block.body.map((part, i) =>
                      Array.isArray(part) ? (
                        <ul key={i} className="space-y-2 pl-5">
                          {part.map((item) => (
                            <li
                              key={item}
                              className="list-disc text-sm leading-relaxed text-marine/75"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i} className="text-sm leading-relaxed text-marine/75">
                          {part}
                        </p>
                      )
                    )}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
