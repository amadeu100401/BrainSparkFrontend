import { DeleteFocus, Focus, FormatTimeResume } from "@/features/Focus";
import { Trash } from "lucide-react";

interface MainContentProps {
    focusHistory: Focus;
    onDelete: (id: string) => void;
}

export default function MainContent({ focusHistory, onDelete }: MainContentProps) {
    const getFormatedFocusTime = () => {
        const formatedFocusTime = FormatTimeResume(focusHistory.focusTime);
        if(formatedFocusTime.hours > 0) {
            return `${formatedFocusTime.hours}h ${formatedFocusTime.minutes}m ${formatedFocusTime.seconds}s`;
        } else if(formatedFocusTime.minutes > 0) {
            return `${formatedFocusTime.minutes}m ${formatedFocusTime.seconds}s`;
        } else {
            return `${formatedFocusTime.seconds}s`;
        }
    }

    const handleDeleteFocus = () => {
        DeleteFocus(focusHistory.id);
        onDelete(focusHistory.id);
    }
    
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pl-1">
                <p className="text-sm text-gray-500">
                    Projeto: {focusHistory.currentProject?.name || "N/A"}
                </p>
            </div>
            <div className="flex items-center gap-3 justify-end pr-2">
                <p className="text-sm text-black font-semibold">{getFormatedFocusTime()}</p>
                <Trash className="w-4 h-4 text-gray-500 transition-transform duration-500 ease-out
                hover:scale-110 hover:shadow-xl hover:cursor-pointer active:scale-95 active:shadow-none active:text-gray-400"
                 onClick={handleDeleteFocus} />
            </div>
        </div>
    )
}