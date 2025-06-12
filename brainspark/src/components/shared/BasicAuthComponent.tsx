import { ReactNode } from "react";

interface BasicAuthComponentProps {
    children: ReactNode;
}

export default function BasicAuthComponent({ children }: BasicAuthComponentProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 select-none fade-in-up">
            {children}
        </div>
    );
}
