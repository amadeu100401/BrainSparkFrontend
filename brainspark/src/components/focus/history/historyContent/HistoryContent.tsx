import { Focus } from "@/features/Focus";
import HistoryTitle from "./historyTitle";
import MainContent from "./MainContent";
import Tag from "./Tag";

interface HistoryContentProps {
    focusHistory: Focus;
    onDelete: (id: string) => void;
}

export default function HistoryContent({ focusHistory, onDelete }: HistoryContentProps) {
    return (
        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg p-2">
            <HistoryTitle title={focusHistory.title} />
            <MainContent focusHistory={focusHistory} onDelete={onDelete} />
            {focusHistory.tagResponse && <Tag tag={focusHistory.tagResponse} />}
        </div>
    )
}