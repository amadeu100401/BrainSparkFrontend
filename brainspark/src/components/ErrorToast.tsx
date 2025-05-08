import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface ErrorToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message = "O serviço encontra-se indisponível.", onClose, duration = 5000 }) => {
  const [width, setWidth] = useState(100);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const interval = 50;
    const totalTicks = duration / interval;
    let tick = 0;

    const timer = setInterval(() => {
      tick++;
      setWidth(100 - (tick / totalTicks) * 100);

      if (tick >= totalTicks) {
        clearInterval(timer);
        setAnimateOut(true);
        setTimeout(() => onClose(), 300);
      }
      
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        "fixed top-4 right-4 z-50 bg-red-600 text-white rounded shadow-md w-72 transition-all duration-300 ease-in-out transform",
        animateOut
          ? "opacity-0 -translate-y-2"
          : "opacity-100 translate-y-0"
      )}
    >
      <div className="p-4 text-sm font-medium">{message}</div>
      <div className="h-1 bg-red-400 rounded-b">
        <div
          className="h-full bg-white transition-all duration-50"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default ErrorToast;
