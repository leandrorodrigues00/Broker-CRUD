import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type InputPrefixProps = ComponentProps<"div">;

// Subcomponente para prefixo do input (ex: ícones) - Compound Components.
export function InputPrefix({ className, ...props }: InputPrefixProps) {
  return <div className={cn(className)} {...props} />;
}

type InputProps = ComponentProps<"input"> & {
  name: string;
};

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      id={props.name}
      className={cn(
        "flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none",
        className,
      )}
      {...props}
    />
  );
}

type InputRootProps = ComponentProps<"div">;

export function InputRoot({ className, ...props }: InputRootProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm",
        "focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100",

        className,
      )}
      {...props}
    />
  );
}
