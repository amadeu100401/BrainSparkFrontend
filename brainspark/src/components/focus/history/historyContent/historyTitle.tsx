interface HistoryTitleProps {
    title: string;
}

export default function HistoryTitle({ title }: HistoryTitleProps) {
    return (
        <div className="flex items-center gap-2 pl-1">
            <span className="inline-block w-2 h-2 rounded-full bg-current text-violet-500" />
            <h2 className="text-lg font-semibold">{title}</h2>
        </div>
    )
}