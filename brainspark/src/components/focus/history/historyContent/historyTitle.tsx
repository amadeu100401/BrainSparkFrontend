import { getFormatedDate } from "@/utils/TimeUtils";

interface HistoryTitleProps {
    title: string;
    createdAt: string;
}

export default function HistoryTitle({ title, createdAt }: HistoryTitleProps) {
    return (
        <div className="flex items-center justify-between gap-2 pl-1">
            <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-current text-violet-500" />
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-xs text-gray-400">
                    {getFormatedDate(createdAt)}
                </p>
            </div>

        </div>
    )
}