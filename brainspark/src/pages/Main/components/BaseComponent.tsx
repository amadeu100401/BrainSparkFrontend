interface BaseComponentProps {
  children: React.ReactNode;
  className?: string; // Permite passar classes extras para o Tailwind
}

export default function BaseComponent({ children, className }: BaseComponentProps) {
  return (
    <div className={`w-[1800px] min-h-[810px] mx-auto bg-white rounded-xl shadow-sm border border-black/20 ${className}`}>
      {children}
    </div>
  );
}
