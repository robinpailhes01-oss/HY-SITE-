const ITEMS = [
  "EVJF",
  "Anniversaires",
  "Entreprise",
  "Nuits insolites",
  "Coucher de soleil",
  "Baignade au large",
];

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-baseline">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-baseline">
          <span className="marquee-outline whitespace-nowrap px-6 font-serif text-5xl italic leading-none sm:text-6xl md:px-10 md:text-7xl">
            {item}
          </span>
          <span className="text-brass" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function MarqueeBand() {
  return (
    <div className="overflow-hidden border-y border-marine/10 py-8 md:py-10" aria-hidden="true">
      <div className="marquee-track flex w-max">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  );
}
