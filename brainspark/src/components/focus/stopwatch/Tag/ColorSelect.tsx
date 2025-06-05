import { Palette } from "lucide-react";

interface ColorSelectProps {
  tagColor: string;
  setShowColorPicker: (showColorPicker: boolean) => void;
  showColorPicker: boolean;
  handleColorSelect: (color: string) => void;
}

const pastelColors = [
  "#7289a8", 
  "#8c74a1", 
  "#96a88c", 
  "#b086a8", 
  "#f5cd89", 
  "#8bcca8", 
  "#a8b5cc", 
  "#cca88b", 
  "#c9d3a8", 
  "#d6a8a8", 
  "#a8cccc", 
  "#e8c1a8", 
  "#c4a8cc", 
  "#a8c9d3" 
];

export default function ColorSelect({
  tagColor,
  handleColorSelect
}: ColorSelectProps) {
  return (
    <div className="w-44 top-full mt-1 flex flex-col gap-1 bg-white p-1">
      <div className="flex items-center gap-1">
        <Palette className="w-4 h-4 text-gray-500" />
        <p className="text-sm text-gray-500">Cor:</p>
      </div>
      <div className="flex flex-row flex-wrap gap-1">
        {pastelColors.map((color) => (
          <div
            key={color}
            className={`w-5 h-5 rounded-full cursor-pointer border transition-all
              ${color === tagColor ? "ring-2 ring-blue-500 border-transparent" : "border-gray-300"}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
    </div>
  );
}
