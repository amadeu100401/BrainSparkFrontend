import {
    Popover,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Tag } from "lucide-react";
import { useState } from "react";
import TagContent from "./TagContent";
import { Button } from "@/components/ui/button";
import { FocusTags } from "@/features/Focus";

interface FocusTagProps {
    tags: FocusTags[];
    selectedTag: FocusTags[];
    setSelectedTag: (tag: FocusTags[]) => void; 
    handleDeleteTag: (tag: FocusTags) => void;
    handleNewTag: (title: string, color: string) => void;
}

export default function FocusTag({ tags, selectedTag, setSelectedTag, handleDeleteTag, handleNewTag }: FocusTagProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                    <Tag className="w-4 h-4 mr-2" />
                    Adicoinar Tag
                </Button>
            </PopoverTrigger>
            <TagContent 
                tags={tags}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                handleDeleteTag={handleDeleteTag}
                handleNewTag={handleNewTag}
            />
        </Popover>
    )
}