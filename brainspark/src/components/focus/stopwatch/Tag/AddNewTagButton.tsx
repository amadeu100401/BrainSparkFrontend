import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useState } from "react";
import ColorSelect from "./ColorSelect";
import { Input } from "@/components/ui/input";

const MAX_LENGTH = 20;

interface AddNewTagButtonProps {
    tagName: string;
    isTagListEmpty: boolean;
    setTagName: (tagName: string) => void;
    handleNewTag: (title: string, color: string) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddNewTagButton({ tagName, isTagListEmpty, setTagName, handleNewTag, handleInputChange }: AddNewTagButtonProps) {
  const [showPalette, setShowPalette] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tagColor, setTagColor] = useState("#7289a8");

  const handleColorSelect = (color: string) => {
    setTagColor(color);
  };

  return (
    <div className="flex flex-col items-center gap-2 pb-2">

      {!isTagListEmpty && (
        <Separator className="w-[180px]" />
      )}
      
      {!showPalette && (
        <Button
          size="tag"
          className="w-[180px] px-2 py-1 flex items-center gap-1 !border-none !shadow-none !ring-0 !outline-none bg-transparent text-black hover:bg-violet-300"
          onClick={() => setShowPalette(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Adicionar Tag</span>
        </Button>
      )}

      {showPalette && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Input
                placeholder="Nova tag"
                value={tagName}
                onChange={handleInputChange}
                maxLength={MAX_LENGTH}
                onKeyDown={(e) => e.key === 'Enter' && handleNewTag(tagName.trim(), tagColor)}
                className="flex-1 border border-gray-200 focus:border-gray-200 focus:ring-0
                    focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-200"
            />

            {showColorPicker && (
                <ColorSelect
                tagColor={tagColor}
                setShowColorPicker={setShowColorPicker}
                showColorPicker={showColorPicker}
                handleColorSelect={handleColorSelect}
                />
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
                variant={"default"} 
                className="w-20 h-7 bg-green-500 hover:bg-green-600" 
                onClick={() => handleNewTag(tagName.trim(), tagColor)}
            >
                Adicionar
            </Button>
            <Button 
                variant={"ghost"} 
                className="w-16 h-7 bg-transparent text-black hover:bg-gray-200" 
                onClick={() => setShowPalette(false)}
            >
                Cancelar
            </Button>
          </div>

        </div>
      )}
    </div>
  );
}
