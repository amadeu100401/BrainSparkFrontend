import { useEffect, useState } from "react";

export default function Loading() {
    const [dots, setDots] = useState('');

    // Para animar os 3 pontos no "Carregando..."
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-zinc-900 border-t-transparent rounded-full animate-spin mb-2"></div>

            {/* Texto com animação de 3 pontinhos */}
            <p className="text-xl text-zinc-950 opacity-80">
                Carregando{dots}
            </p>
        </div>
    );
}
