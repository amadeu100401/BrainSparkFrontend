import { Palette } from "lucide-react";

interface ColorSelectProps {
    tagColor: string;
    setShowColorPicker: (showColorPicker: boolean) => void;
    showColorPicker: boolean;
    handleColorSelect: (color: string) => void;
}

const pastelColors = [
    "#7289a8", "#8c74a1", "#96a88c", "#b086a8", "#f5cd89", "#8bcca8"
];

export default function ColorSelect({ tagColor, setShowColorPicker, showColorPicker, handleColorSelect }: ColorSelectProps) {
    return (
      <div className="absolute top-full mt-1 flex gap-1 bg-white p-1 rounded shadow z-50">
        {pastelColors.map((color) => (
          <div
            key={color}
            className="w-5 h-5 rounded-full cursor-pointer border border-gray-300"
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
    );
  }
  
