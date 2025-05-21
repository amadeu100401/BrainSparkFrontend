interface TimeBlockProps {
    label: string,
    value: number
}

export default function TimeBlock(timeProps: TimeBlockProps) {
    return(
        <div className="flex flex-col items-center">
            <span className="text-5xl font-bold tobular-nums text-violet-500 select-none">
                {String(timeProps.value).padStart(2, "0")}
            </span>
            <span className="text-sm text-gray-600">{timeProps.label}</span>
        </div>
    );
}