import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Tag, Palette } from "lucide-react"
import { UUID } from "node:crypto";
import UUIDUtil from "@/utils/UUIDUtil";
import { useEffect, useState, useRef } from "react";

export default function AddNewTag() {
    const [existingTags] = useState<{ id: UUID; name: string; color?: string }[]>([]);
    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState("#8B5CF6");
    const colorPickerRef = useRef<HTMLInputElement>(null);
    const MAX_LENGTH = 25;
    
    useEffect(() => {
        // setExistingTags([
        //     { id: UUIDUtil(), name: 'Tag 1', color: '#8B5CF6' },
        //     { id: UUIDUtil(), name: 'Tag 2', color: '#8B5CF6' },
        //     { id: UUIDUtil(), name: 'Tag 3', color: '#8B5CF6' },
        // ]);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_LENGTH) {
            setTagName(value);
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagColor(e.target.value);
    };

    const handleColorClick = () => {
        colorPickerRef.current?.click();
    };

    const handleNewTag = () => {
        existingTags.push({ id: UUIDUtil(), name: tagName, color: tagColor });
        setTagName("");
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    className="text-sm border-none bg-transparent text-black hover:bg-violet-400 
                    focus:ring-0 focus:outline-none ring-0 active:shadow-inner transition duration-100"
                >
                <Tag /> Adicionar tag
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-70 select-none">
                <div className="flex flex-col gap-2">  

                    <div className="flex flex-col gap-1">
                        {existingTags.map((tag) => (
                            <div 
                                key={tag.id} 
                                className="flex items-center rounded-md gap-2 w-full p-2 bg-violet-400
                                        text-white border-none hover:bg-violet-500 focus:ring-0
                                        focus:outline-none focus:ring-offset-0 cursor-pointer"
                                style={{ backgroundColor: tag.color }}
                            >
                                <Tag /> {tag.name}
                            </div>
                        ))}

                        <div className="relative w-full flex gap-2 items-center">
                            <Input 
                                placeholder="Nova tag" 
                                value={tagName}
                                onChange={handleInputChange}
                                maxLength={MAX_LENGTH}
                                className="w-full focus:outline-none focus:ring-0 focus:border-0 border-0
                                        shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && tagName.trim()) {
                                        handleNewTag();
                                    }
                                }}
                            />
                            <div className="relative flex items-center">
                                <Palette 
                                    className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={handleColorClick}
                                    style={{ color: tagColor }}
                                />
                                <input
                                    ref={colorPickerRef}
                                    type="color"
                                    value={tagColor}
                                    onChange={handleColorChange}
                                    className="absolute left-0 opacity-0 w-6 h-6 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}