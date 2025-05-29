import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFocus } from "@/contexts/FocusContext";
import { useState, useEffect } from "react";
import { currentProject, SaveFocusProject } from "@/features/Focus";
import { X } from "lucide-react";

interface ProjectProps {
  currentProjects: currentProject[];
}

export default function CurrentProject({ currentProjects }: ProjectProps) {
  const { selectedProject, setSelectedProject } = useFocus();

  // Inicializa projetos e sincroniza com props
  const [projects, setProjects] = useState<currentProject[]>(currentProjects ?? []);
  const [newProjectName, setNewProjectName] = useState("");

  // Sincroniza quando currentProjects mudar
  useEffect(() => {
    setProjects(currentProjects ?? []);
  }, [currentProjects]);

  const handleSelect = (value: string) => {
    const project = projects.find((p) => p.id === value);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleAddProject = async () => {
    const trimmedName = newProjectName.trim();
    if (trimmedName === "") return;

    const newProject = {
      id: Date.now().toString(),
      name: trimmedName,
    };

    // Adiciona novo projeto e define como selecionado
    setProjects((prev) => [...prev, newProject]);
    setSelectedProject(newProject);
    setNewProjectName("");

    // Salva no backend (assumindo que SaveFocusProject é assíncrono)
    await SaveFocusProject(newProject);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border-gray-200">
      <p className="text-sm text-gray-500 mb-1">Projeto atual</p>

      <Select value={selectedProject?.id} onValueChange={handleSelect} disabled={projects.length === 0}>
        <SelectTrigger className="w-full rounded p-2 text-sm">
          <SelectValue placeholder="Selecione o projeto" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {projects.map((project) => (
              <SelectItem 
                key={project.id} 
                value={project.id} 
                className="flex items-center justify-between cursor-pointer data-[highlighted]:bg-violet-400 data-[highlighted]:text-white transition-colors duration-200 ease-in-out relative group"
              >
                <span className="transition-transform duration-200 ease-in-out group-data-[highlighted]:translate-x-1">
                  {project.name}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Input para novo projeto */}
      <div className="flex mt-2 gap-2">
        <Input
          placeholder="Novo projeto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="flex-1 focus-visible:ring-0"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddProject();
          }}
        />
        <Button
          onClick={handleAddProject}
          className="px-4 py-2 rounded bg-transparent shadow-black/20 text-black hover:bg-violet-400 
          border-none focus:ring-0 focus:outline-none ring-0 active:shadow-inner transition duration-100"
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
}
