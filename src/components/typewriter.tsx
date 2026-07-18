"use client";

import * as React from "react";

type Props = {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  className?: string;
  caretClassName?: string;
};

/**
 * Typewriter that cycles through phrases. SSR-safe: renders the first
 * phrase statically, then begins the animation only after mount to avoid
 * hydration mismatches.
 */
export function Typewriter({
  phrases,
  typeSpeed = 65,
  deleteSpeed = 35,
  holdTime = 1600,
  className,
  caretClassName,
}: Props) {
  const mounted = React.useSyncExternalStore(
    React.useCallback(() => () => undefined, []),
    () => true,
    () => false
  );
  const [display, setDisplay] = React.useState("");
  const [phraseIdx, setPhraseIdx] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);


  React.useEffect(() => {
    if (!mounted) return;
    const current = phrases[phraseIdx % phrases.length] ?? "";

    // finished typing → hold then start deleting
    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), holdTime);
      return () => clearTimeout(t);
    }

    // finished deleting → next phrase
    if (deleting && display === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((i) => i + 1);
      }, 0);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => {
        setDisplay((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [display, deleting, phraseIdx, phrases, typeSpeed, deleteSpeed, holdTime, mounted]);

  return (
    <span className={className} aria-label={phrases[0]}>
      {mounted ? display : phrases[0]}
      <span className={`caret ${caretClassName ?? ""}`} aria-hidden="true">
        &nbsp;
      </span>
    </span>
  );
}
