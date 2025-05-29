import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag, Palette, X } from "lucide-react";
import { UUID } from "node:crypto";
import UUIDUtil from "@/utils/UUIDUtil";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const pastelColors = [
    "#7289a8", "#8c74a1", "#96a88c", "#b086a8", "#f5cd89",
    "#8bcca8", "#e38b76", "#c78794", "#88ebeb", "#c5e68e"
];

export default function AddNewTag() {
    const MAX_LENGTH = 25;

    const [existingTags, setExistingTags] = useState<{ id: UUID; name: string; color?: string }[]>([]);
    const [selectedTag, setSelectedTag] = useState<{ id: UUID; name: string; color?: string } | null>(null);
    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState(pastelColors[0]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showColorPicker) {
            timer = setTimeout(() => {
                setShowColorPicker(false);
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [showColorPicker]);

    useEffect(() => {
        if (!isPopoverOpen) {
            setShowColorPicker(false);
        }
    }, [isPopoverOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_LENGTH) {
            setTagName(e.target.value);
        }
    };

    const handleNewTag = () => {
        if (!tagName.trim()) return;
        const newTag = { id: UUIDUtil(), name: tagName.trim(), color: tagColor };
        setExistingTags((prev) => [...prev, newTag]);
        setSelectedTag(newTag);
        setTagName("");
    };

    const handleTagClick = (tag: { id: UUID; name: string; color?: string }) => {
        setSelectedTag(tag);
    };

    const handleTagRemove = (tagId: UUID) => {
        setExistingTags((prev) => prev.filter(tag => tag.id !== tagId));
        if (selectedTag?.id === tagId) setSelectedTag(null);
    };

    const handleColorSelect = (color: string) => {
        setTagColor(color);
        setShowColorPicker(false);
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    className={`flex items-center justify-start text-sm ${selectedTag ? 'w-[150px]' : 'w-[150px]'}
                        h-[40px] border-none bg-transparent text-black hover:bg-violet-400 overflow-hidden
                        text-ellipsis whitespace-nowrap focus:ring-0 focus:outline-none transition duration-100`}
                    style={{ backgroundColor: selectedTag?.color }}
                >
                    <Tag className={`flex-shrink-0 ${selectedTag?.color ? 'text-white' : 'text-black'}`} />
                    {selectedTag ? (
                        <span className={`truncate ${selectedTag?.color ? 'text-white' : 'text-black'}`}>
                            {selectedTag.name}
                        </span>
                    ) : "Adicionar Tag"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 select-none py-2">
                <div className="flex flex-col gap-2">
                    {existingTags.map((tag) => (
                        <div
                            key={tag.id}
                            className="flex items-center rounded-md w-full gap-2 py-1 px-2
                            hover:opacity-90 cursor-pointer text-white font-semibold"
                            style={{ backgroundColor: tag.color }}
                            onClick={() => handleTagClick(tag)}
                        >
                            <Tag className="w-5 h-5" />
                            <span className="truncate">{tag.name}</span>
                            <X
                                className="ml-auto text-transparent hover:text-white cursor-pointer w-4 h-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleTagRemove(tag.id);
                                }}
                            />
                        </div>
                    ))}
                    <div className="flex gap-2 items-center">
                        <Input
                            placeholder="Nova tag"
                            value={tagName}
                            onChange={handleInputChange}
                            maxLength={MAX_LENGTH}
                            onKeyDown={(e) => e.key === 'Enter' && handleNewTag()}
                            className="flex-1 border border-gray-200 focus:border-gray-200 focus:ring-0
                             focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-200"
                        />
                        <div
                            className="relative flex items-center"
                        >
                            <Palette 
                                className="w-5 h-5 cursor-pointer" 
                                style={{ color: tagColor }}
                                onClick={() => setShowColorPicker(!showColorPicker)}
                            />
                            {showColorPicker && (
                                <div className="absolute top-full mt-1 flex gap-1 bg-white p-1 rounded shadow">
                                    {pastelColors.map((color) => (
                                        <div
                                            key={color}
                                            className="w-5 h-5 rounded-full cursor-pointer border border-gray-300"
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorSelect(color)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none hover:bg-violet-300"
                        onClick={handleNewTag}
                    >
                        Adicionar
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
