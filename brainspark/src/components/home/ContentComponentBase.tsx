interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
}

export default function BaseComponent({ children, className }: BaseComponentProps) {
  return (
      <div className={`
        relative w-full max-w-[1790px] h-[870px] mx-auto 
        bg-white rounded-xl shadow-sm border border-black/20 
        overflow-y-auto overflow-x-hidden
        ${className ?? ''}
      `}>
        {children}
      </div>
  );
}
