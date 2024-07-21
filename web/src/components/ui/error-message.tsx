import type { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return <span className="text-xs text-red-500">{children}</span>;
}
