interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
}

export default function BaseComponent({ children, className }: BaseComponentProps) {
  return (
      <div className={`
        relative w-full min-h-screen mx-auto 
        bg-zinc-100 rounded-xl 
        overflow-x-hidden
        ${className ?? ''}
      `}>
        {children}
      </div>
  );
}
