"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({ index, title, subtitle, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn("mb-8", className)}
    >
      <p className="font-mono text-xs text-primary">{index}</p>
      <h2 className="mt-1 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
