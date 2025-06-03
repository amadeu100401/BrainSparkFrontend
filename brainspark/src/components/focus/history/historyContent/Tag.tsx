import { FocusTags } from "@/features/Focus"

interface TagProps {
    tagList: FocusTags[]
}

export default function Tag({ tagList: tag }: TagProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {tag.map((tag) => (
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
            ))}
        </div>
    )
}