import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FocusProject } from "@/features/Focus";

interface DeleteProjectButtonProps {
    hoveredProjectId: string | null;
    setHoveredProjectId: (id: string | null) => void;
    handleDeleteProject: (project: FocusProject) => void;
    projetc: FocusProject;
    selectedProject: FocusProject | null;
}

export function DeleteProjectButton({ hoveredProjectId, setHoveredProjectId, handleDeleteProject, projetc, selectedProject }: DeleteProjectButtonProps) {
    return (
        <div
            className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1"
            onMouseEnter={() => setHoveredProjectId(projetc.id)}
            onMouseLeave={() => setHoveredProjectId(null)}
        >
            {/* Ícone Check */}
            <Check
            className={cn(
                "p-0 w-5 h-5 flex items-center justify-center transition-opacity duration-300 ease-in-out",
                selectedProject?.id === projetc.id &&
                hoveredProjectId !== projetc.id
                ? "opacity-100"
                : "opacity-0"
            )}
            />

            {/* Botão X */}
            <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
                e.stopPropagation();
                handleDeleteProject(projetc);
            }}
            className={cn(
                "p-2 absolute inset-0 w-5 h-5 flex items-center justify-center outline-none focus:outline-none", 
                "bg-transparent transition-opacity duration-300 ease-in-out active:scale-95 active:opacity-75",
                hoveredProjectId === projetc.id ? "opacity-100" : "opacity-0"
            )}
            >
            <X className="w-4 h-4" />
            </Button>
      </div>
    )
}