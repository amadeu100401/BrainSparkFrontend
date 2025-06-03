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
import { FocusProject, SaveFocusProject, DeleteFocusProject } from "@/features/Focus";
import { X } from "lucide-react";

interface ProjectProps {
  currentProjects: FocusProject[];
}

export default function CurrentProject({ currentProjects }: ProjectProps) {
  const { selectedProject, setSelectedProject } = useFocus();

  const [projects, setProjects] = useState<FocusProject[]>(currentProjects ?? []);
  const [newProjectName, setNewProjectName] = useState("");

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
    if (!trimmedName) {
      // Se estiver vazio ou só com espaços
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      name: trimmedName,
    };

    setProjects((prev) => [...prev, newProject]);
    setSelectedProject(newProject);
    setNewProjectName("");

    var projectId = await SaveFocusProject(newProject);

    if (projectId) {
      newProject.id = projectId;
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    const success = await DeleteFocusProject(projectId);

    if (success) {
      const updatedProjects = projects.filter((p) => p.id !== projectId);
      setProjects(updatedProjects);
      
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
      } else if (updatedProjects.length === 0) {
        setSelectedProject(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border-gray-200">
      <p className="text-sm text-gray-500 mb-1">Projeto atual</p>

      <Select value={selectedProject?.id || ""} onValueChange={handleSelect} disabled={projects.length === 0}>
        <SelectTrigger
          className="w-full rounded p-2 text-sm !outline-none !ring-0 !focus:outline-none !focus:ring-0 !focus:shadow-none !hover:outline-none !hover:ring-0 !hover:shadow-none flex items-center"
        >
          <SelectValue className="m-0 p-0" placeholder="Selecione o projeto" />
        </SelectTrigger>
        {projects.length > 0 && (
          <SelectContent 
            position="popper" 
            align="center" 
            className="w-[240px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md z-[999] 
            border border-gray-300 backdrop-blur-sm p-1 pb-2"
          >
            <SelectGroup className="w-full space-y-1">
              {projects.map((project) => (
                  <div key={project.id} className="flex items-center relative group w-[222px] has-[button:hover]:data-[highlighted]">
                    <SelectItem 
                      value={project.id} 
                      className="w-[240px] cursor-pointer data-[highlighted]:bg-violet-400
                      data-[highlighted]:text-white transition-colors duration-200 ease-in-out pl-5 py-1 text-sm truncate pr-2
                      group-has-[button:hover]:bg-violet-400 group-has-[button:hover]:text-white"
                    >
                      {project.name}
                    </SelectItem>
                    <button 
                      className="absolute left-1 p-0.5 bg-transparent border-0 shadow-none 
                      hover:bg-transparent focus:outline-none focus:ring-0 active:shadow-none z-10
                      transition-colors duration-200 ease-in-out
                      group-hover:text-black group-data-[highlighted]:text-white hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteProject(project.id);
                      }}
                      type="button"
                    >
                      <X 
                        size={11}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                        hover:text-red-500 cursor-pointer text-white"
                      />
                    </button>
                  </div>
              ))}
            </SelectGroup>
          </SelectContent>
        )}
      </Select>

      {/* Input para novo projeto */}
      <div className="flex mt-2 gap-2">
        <Input
          placeholder="Novo projeto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="flex-1 focus-visible:ring-0"
          onKeyDown={(e) => {
            if (e.key === "Enter" && newProjectName.trim()) handleAddProject();
          }}
        />
        <Button
          onClick={handleAddProject}
          disabled={!newProjectName.trim()}
          className="px-4 py-2 rounded bg-transparent shadow-black/20 text-black hover:bg-violet-400 
          border-none focus:ring-0 focus:outline-none ring-0 active:shadow-inner transition duration-100
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
}
