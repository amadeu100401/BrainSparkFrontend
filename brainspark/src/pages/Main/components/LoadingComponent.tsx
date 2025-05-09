import { useEffect, useState } from "react";

export default function Loading() {
    const [dots, setDots] = useState('');
    
    useEffect(() => {
        const interval = setInterval(() => {
        setDots(prev => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return(
        <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold animate-pulse">
          Carregando{dots}
        </p>
      </div> 
    );
}