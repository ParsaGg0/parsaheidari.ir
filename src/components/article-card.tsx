"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** delay for staggered entrance */
  index?: number;
};

/**
 * Hover-raise card: lifts on hover with a soft themed glow shadow.
 * Entrance animates in from below for a lively notebook feel.
 */
export function ArticleCard({ children, className, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.36),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm sm:p-6",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-primary/45 hover:shadow-[0_18px_40px_-18px_var(--glow)]",
        className
      )}
    >
      {/* corner accent that brightens on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </motion.article>
  );
}
