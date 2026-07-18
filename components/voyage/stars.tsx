const STARS = [
  { top: "8%", left: "12%", size: 2, delay: "0s" },
  { top: "15%", left: "78%", size: 3, delay: "1.2s" },
  { top: "22%", left: "45%", size: 2, delay: "2.4s" },
  { top: "6%", left: "60%", size: 2, delay: "0.8s" },
  { top: "30%", left: "25%", size: 2, delay: "1.8s" },
  { top: "12%", left: "90%", size: 2, delay: "3s" },
  { top: "35%", left: "68%", size: 3, delay: "0.4s" },
  { top: "26%", left: "8%", size: 2, delay: "2s" },
  { top: "18%", left: "33%", size: 2, delay: "3.4s" },
  { top: "40%", left: "85%", size: 2, delay: "1.5s" },
  { top: "45%", left: "15%", size: 2, delay: "2.8s" },
  { top: "10%", left: "50%", size: 2, delay: "4s" },
];

export function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {STARS.map((star, i) => (
        <span
          key={i}
          className="star-twinkle absolute rounded-full bg-sable"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
