import { ComponentProps, ReactNode } from "react";

export interface BubbleButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
}

export function BubbleButton({ children, ...props }: BubbleButtonProps) {
  return (
    <button
      type="button"
      className="p-2 text-zinc-200 text-sm flex items-center gap-1.5 font-medium leading-none bg-zinc-700 hover:text-zinc-50 hover:bg-zinc-600 
      data-[active=true]:bg-zinc-600 data-[active=true]:text-violet-400"
      {...props}
    >
      {children}
    </button>
  );
}
