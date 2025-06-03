import ColorSelect from "./ColorSelect";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const MAX_LENGTH = 20;

interface AddNewTagInputProps {
  tagName: string;
  setTagName: (tagName: string) => void;
  handleNewTag: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddNewTagInput({
  tagName,
  setTagName,
  handleNewTag,
  handleInputChange,
}: AddNewTagInputProps) {
  const [tagColor, setTagColor] = useState<string>("#7289a8");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const handleColorSelect = (color: string) => {
    setTagColor(color);
    setShowColorPicker(false);
  };

  return (
    <div className="select-none inline-flex items-center pb-2 gap-2">
      <Input
        placeholder="Nova tag"
        value={tagName}
        onChange={handleInputChange}
        maxLength={MAX_LENGTH}
        onKeyDown={(e) => e.key === "Enter" && handleNewTag()}
        className="flex-1 border border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
         focus-visible:border-gray-200"
      />
      <ColorSelect
        tagColor={tagColor}
        setShowColorPicker={setShowColorPicker}
        showColorPicker={showColorPicker}
        handleColorSelect={handleColorSelect}
      />
    </div>
  );
}
