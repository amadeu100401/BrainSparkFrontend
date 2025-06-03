import { Command } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { CommandList, CommandItem, CommandGroup } from "cmdk";
import { Check, X } from "lucide-react";
import AddNewTagSection from "./AddNewTagSector";
import { FocusTags } from "@/features/Focus";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TagContentProps {
  tags: FocusTags[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedTag: FocusTags[];
  setSelectedTag: (tag: FocusTags[]) => void;
  handleDeleteTag: (tag: FocusTags) => void;
  handleNewTag: (title: string, color: string) => void;
}

export default function TagContent({
  tags,
  selectedTag,
  setSelectedTag,
  handleDeleteTag,
  handleNewTag,
}: TagContentProps) {
  const [hoveredTagId, setHoveredTagId] = useState<string | null>(null);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#7289a8");

  const toggleTag = (tag: FocusTags) => {
    if (selectedTag.find((t) => t.id === tag.id)) {
      setSelectedTag(selectedTag.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };

  const handleColorSelect = (color: string) => {
    setTagColor(color);
  };

  const onCreateNewTag = () => {
    if (tagName.trim().length === 0) return;
    handleNewTag(tagName.trim(), tagColor);
    setTagName("");
  };

  return (
    <PopoverContent className="w-[200px] p-0 select-none flex justify-center">
      <Command>
        <CommandList className="flex flex-col gap-2 py-2">
          <CommandGroup className="gap-1">
            {tags.map((item) => (
              <CommandItem
                key={item.id}
                value={item.name}
                onSelect={() => toggleTag(item)}
                className="cursor-pointer"
              >
                <div className="px-4 py-2 rounded-md flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full bg-current text-violet-500"
                      style={{ color: item.color ?? "#8b5cf6" }}
                    />
                    {item.name}
                  </div>

                  <div
                    className="relative w-5 h-5 ml-2"
                    onMouseEnter={() => setHoveredTagId(item.id)}
                    onMouseLeave={() => setHoveredTagId(null)}
                  >
                    {/* Ícone Check - visível só quando tag está selecionada e não hover */}
                    <Check
                      className={cn(
                        "absolute inset-0 w-5 h-5 transition-opacity duration-300 ease-in-out",
                        selectedTag.some((t) => t.id === item.id) &&
                          hoveredTagId !== item.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />

                    {/* Botão X - visível só quando hover */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTag(item);
                      }}
                      className={cn(
                        "p-2 absolute inset-0 w-5 h-5 flex items-center justify-center outline-none focus:outline-none bg-transparent transition-opacity duration-300 ease-in-out",
                        "active:scale-95 active:opacity-75",
                        hoveredTagId === item.id ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CommandItem>    
            ))}
          </CommandGroup>
        </CommandList>

        <AddNewTagSection
          tagName={tagName}
          setTagName={setTagName}
          handleNewTag={onCreateNewTag}
          handleInputChange={handleInputChange}
          isTagListEmpty={tags.length === 0}
        />
      </Command>
    </PopoverContent>
  );
}
