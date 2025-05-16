import { ComponentProps } from "react";

interface FloatMenuButtonProps extends ComponentProps<'button'> {
  imageUrl?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export function FloatMenuButton({
  imageUrl,
  alt = "",
  title,
  subtitle,
  ...props
}: FloatMenuButtonProps) {
  return (
    <button {...props} className="flex items-center gap-2 p-1 rounded min-w-[280px] bg-zinc-800 hover:bg-zinc-700 focus:outline-none border-none">
      {imageUrl && (
        <img src={imageUrl} alt={alt} className="w-6 border-zinc-600 h-5 object-contain" />
      )}

      {(title || subtitle) && (
        <div className="flex flex-col text-left">
          {title && <span className="text-sm font-sm text-zinc-100">{title}</span>}
          {subtitle && <span className="text-xs text-zinc-400">{subtitle}</span>}
        </div>
      )}
    </button>
  );
}
