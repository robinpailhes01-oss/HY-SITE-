"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const word = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  wordClassName?: string;
  once?: boolean;
  delay?: number;
}

export function SplitText({
  text,
  as: Tag = "h2",
  className,
  wordClassName,
  once = true,
  delay = 0,
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount: 0.6 }}
        variants={container}
        transition={{ delayChildren: delay }}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
            <motion.span className={`inline-block ${wordClassName ?? ""}`} variants={word}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
