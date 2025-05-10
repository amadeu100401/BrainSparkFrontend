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
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}