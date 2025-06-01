import { FocusTags } from "@/features/Focus"

interface TagProps {
    tag: FocusTags
}

export default function Tag({ tag }: TagProps) {
    return (
        <div
        className="inline-flex items-center h-5 rounded-md p-2 max-w-[120px] bg-gray-500 whitespace-nowrap"
        style={{
            backgroundColor: tag.color || undefined,
            width: "fit-content",
            maxWidth: "120px",
        }}
        >
            <p className="text-sm text-white">{tag.name}</p>
        </div>
    )
}