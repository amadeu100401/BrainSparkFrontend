import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

interface ResetClockButtonProps {
    hasCurrentTime: boolean;
    handleReset: () => void;
}

export default function ResetClockButton({ hasCurrentTime, handleReset }: ResetClockButtonProps) {
    return (
        <Button
                disabled={!hasCurrentTime}
                className="px-4 py-2 rounded bg-transparent text-black hover:bg-violet-400
                border-none focus:ring-0 focus:outline-none ring-0 active:shadow-inner transition duration-100"
                onClick={handleReset}
            >
            <History className="w-4 h-4 mr-1" /> Resetar
        </Button>
    )
}