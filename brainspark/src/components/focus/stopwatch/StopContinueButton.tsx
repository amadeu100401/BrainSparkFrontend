import { Button } from "@/components/ui/button";
import { Pause } from "lucide-react";
import { Play } from "lucide-react";

interface StopContinueButtonProps {
    isRunning: boolean;
    setIsRunning: (isRunning: boolean) => void;
}

export default function StopContinueButton({ isRunning, setIsRunning }: StopContinueButtonProps) {

    return(
        <Button
                className={`px-4 py-2 rounded hover:bg-violet-700 border-none focus:ring-0 focus:outline-none ring-0
                ${isRunning ? 'bg-red-500 hover:bg-red-700' : 'bg-violet-500'}`}
                onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? (
                <Pause className="w-4 h-4 mr-1" />
              ) : (
                <Play className="w-4 h-4 mr-1" />
              )}
              {isRunning ? 'Pausar' : 'Iniciar'}
        </Button>
    )
}