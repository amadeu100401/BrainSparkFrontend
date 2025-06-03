import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const MAX_LENGTH = 20;

interface AddNewProjectProps {
    isProjectListEmpty: boolean;
    showButton: boolean;
    setShowButton: (showButton: boolean) => void;
    projectName: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNewProject: (projectName: string) => void;
}

export function AddNewProject({ isProjectListEmpty, showButton, setShowButton, projectName, handleInputChange, handleNewProject }: AddNewProjectProps) {
    return (
        <div className="w-full flex flex-col items-center gap-2 pb-2">
            {!isProjectListEmpty && (
                <Separator className="w-[240px]" />
            )}
            
            {!showButton && (
                <Button
                    size="tag"
                    className="w-[240px] px-2 py-1 flex items-center gap-1 !border-none !shadow-none !ring-0 !outline-none bg-transparent text-black hover:bg-violet-300"
                    onClick={() => setShowButton(true)}
                >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Adicionar Projeto</span>
                </Button>
            )}
    
            {showButton && (
                <div className="w-60 flex flex-col items-center gap-2">
                    <div className="w-full flex items-center gap-2">
                    <Input
                        placeholder="Novo projeto"
                        value={projectName}
                        onChange={handleInputChange}
                        maxLength={MAX_LENGTH}
                        onKeyDown={(e) => e.key === 'Enter' && handleNewProject(projectName.trim())}
                        className="flex-1 border border-gray-200 focus:border-gray-200 focus:ring-0
                            focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-200"
                    />
                    </div>
                    
                    <div className="flex items-center gap-1">
                    <Button 
                        variant={"default"} 
                        className="w-44 h-7 bg-green-500 hover:bg-green-600" 
                        onClick={() => handleNewProject(projectName.trim())}
                    >
                        Adicionar
                    </Button>
                    <Button 
                        variant={"ghost"} 
                        className="w-16 h-7 bg-transparent text-black hover:bg-gray-200" 
                        onClick={() => setShowButton(false)}
                    >
                        Cancelar
                    </Button>
                    </div>
        
                </div>
            )}
      </div>
    )
}