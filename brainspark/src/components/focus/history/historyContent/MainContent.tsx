import { DeleteFocus, Focus, FormatTimeResume } from "@/features/Focus";
import { getFormatedHour } from "@/utils/TimeUtils";
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

    const getFinishedAt = () => {
        const finishedAt = new Date(focusHistory.startedAt);
        finishedAt.setSeconds(finishedAt.getSeconds() + focusHistory.focusTime);
        return getFormatedHour(finishedAt.toISOString());
    }

    const handleDeleteFocus = () => {
        DeleteFocus(focusHistory.id);
        onDelete(focusHistory.id);
    }

    const projectName = focusHistory.currentProject?.name;
    
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pl-1 text-xs text-gray-400">
                {projectName && (
                    <div className="flex items-center gap-2">
                        <p >
                            {projectName}
                        </p>
                        <span className="w-1 h-1 rounded-full bg-current" />
                    </div>
                )}

                <div className="flex items-center gap-1">
                <p>
                    {getFormatedHour(focusHistory.startedAt)}
                </p>
                -
                <p>
                    {getFinishedAt()}
                </p>
            </div>

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