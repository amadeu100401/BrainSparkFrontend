import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  type: "error" | "success";
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 5000, type }) => {
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

  const bgColor = type === "error" ? "bg-red-600" : "bg-green-600";
  const progressColor = "bg-white";

  return (
    <div
      className={`fixed top-4 right-4 z-50 text-white rounded shadow-md w-72 transition-all duration-300 ease-in-out transform ${animateOut ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"} ${bgColor}`}
    >
      <div className="p-4 text-sm font-medium">{message}</div>
      <div className="h-1 rounded-b">
        <div
          className="h-full transition-all duration-50"
          style={{ width: `${width}%`, backgroundColor: progressColor }}
        />
      </div>
    </div>
  );
};

export default Toast;
