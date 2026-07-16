export function WakeLine({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 4 800"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 0 C2 120 2 120 2 240 C2 360 2 360 2 480 C2 600 2 600 2 720 L2 800"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
