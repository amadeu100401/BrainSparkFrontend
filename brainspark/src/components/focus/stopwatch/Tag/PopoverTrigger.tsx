import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

interface TagTriggerProps {
    value: string;
    setValue: (value: string) => void;
}

export default function TagTrigger({ value, setValue }: TagTriggerProps) {
    return (
        <Button variant="outline" className="w-[150px] justify-start">
                    <Tag className="w-4 h-4 mr-2" />
                    {value ? value : "Adicoinar Tag"}
        </Button>
    )
}