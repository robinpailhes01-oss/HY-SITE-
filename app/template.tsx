"use client";

import { motion } from "motion/react";
import { PageTransition } from "@/components/page-transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransition />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
