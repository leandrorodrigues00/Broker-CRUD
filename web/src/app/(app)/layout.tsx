import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1200px] p-8">
      {children}
    </div>
  );
}
