interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
}

export default function BaseComponent({ children, className }: BaseComponentProps) {
  return (
      <div className={`
        relative w-full h-full mx-auto 
        bg-zinc-100 rounded-xl
        overflow-y-auto overflow-x-hidden
        ${className ?? ''}
      `}>
        {children}
      </div>
  );
}
