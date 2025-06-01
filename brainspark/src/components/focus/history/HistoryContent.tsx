import { Focus } from "@/features/Focus";

interface HistoryContentProps {
    focusHistory: Focus;
}

export default function HistoryContent({ focusHistory }: HistoryContentProps) {
    return (
        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg p-2">
            <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
                <h2 className="text-lg font-semibold">{focusHistory.title}</h2>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{focusHistory.focusTime}</p>
            </div>
        </div>
    )
}