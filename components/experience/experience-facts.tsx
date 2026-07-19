import { Reveal } from "@/components/motion/reveal";

interface Fact {
  label: string;
  value: string;
}

export function ExperienceFacts({ facts }: { facts: Fact[] }) {
  return (
    <Reveal className="border-b border-marine/10 bg-sable-50">
      <div className="container grid grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-4 md:py-10">
        {facts.map((fact) => (
          <div key={fact.label}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-marine/55">
              {fact.label}
            </p>
            <p className="mt-1.5 font-serif text-lg text-marine md:text-xl">{fact.value}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
