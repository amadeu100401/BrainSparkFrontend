interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
}

export default function BaseComponent({ children, className }: BaseComponentProps) {
  return (
      <div className={`
        relative w-full min-h-screen mx-auto 
        bg-slate-50
        rounded-xl 
        overflow-x-hidden
        ${className ?? ''}
        pb-10
      `}>
        {children}
        <div className="h-10" />
      </div>
  );
}