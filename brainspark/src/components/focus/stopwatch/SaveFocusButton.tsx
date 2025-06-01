import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import StopContinueButton from "./StopContinueButton";
import ResetClockButton from "./ResetClockButton";

interface SaveFocusButtonProps {
    hasCurrentTime: boolean;
    handleReset: () => void;
    isRunning: boolean;
    setIsRunning: (isRunning: boolean) => void;
    handleSubimit: () => void;
}

export default function SaveFocusButton({ hasCurrentTime, handleReset, isRunning, setIsRunning, handleSubimit }: SaveFocusButtonProps) {
    return (
        <div className="flex items-center gap-2">
            <ResetClockButton
                hasCurrentTime={hasCurrentTime}
                handleReset={handleReset}
            />

            <StopContinueButton 
                isRunning={isRunning}
                setIsRunning={setIsRunning}
            />

            {(!isRunning && hasCurrentTime)&& (
                <Button
                    className="px-4 py-2 rounded bg-transparent text-black hover:bg-violet-400
                    border-none focus:ring-0 focus:outline-none ring-0 active:shadow-inner transition duration-100"
                    onClick={handleSubimit}
                >
                    <ArrowDownToLine className="w-4 h-4 mr-1" /> Salvar
                </Button>
            )}
        </div>
    )
}