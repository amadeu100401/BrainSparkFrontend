import { Focus } from "@/features/Focus";
import HistoryTitle from "./HistoryTitle";
import MainContent from "./MainContent";
import Tag from "./Tag";

interface HistoryContentProps {
    focusHistory: Focus;
    onDelete: (id: string) => void;
}

export default function HistoryContent({ focusHistory, onDelete }: HistoryContentProps) {

    const tags = focusHistory.tagResponse;

    return (
        <div className="flex flex-col border border-gray-200 rounded-lg p-2">
            <HistoryTitle title={focusHistory.title} createdAt={focusHistory.startedAt} />
            <MainContent focusHistory={focusHistory} onDelete={onDelete} />
            <Tag tagList={tags} />
        </div>
    )
}