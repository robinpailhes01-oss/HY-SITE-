export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="32" y1="38" x2="32" y2="62" stroke="currentColor" strokeWidth="1.4" />
      <line x1="68" y1="38" x2="68" y2="62" stroke="currentColor" strokeWidth="1.4" />
      <line x1="32" y1="50" x2="68" y2="50" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M50 30 L52.5 36 L50 42 L47.5 36 Z"
        fill="currentColor"
      />
    </svg>
  );
}
