import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Unused — kept so existing pages don't need updating. */
  delay?: number;
  y?: number;
};

export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
