import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DeleteFocusProject,
  FocusProject,
  SaveFocusProject,
} from "@/features/Focus";
import { useEffect, useState } from "react";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { AddNewProject } from "./AddNewProject";
import { useFocus } from "@/contexts/FocusContext";

interface ProjectProps {
  currentProjects: FocusProject[];
}

export default function Project({ currentProjects: initialProjects }: ProjectProps) {
  const [currentProjects, setCurrentProjects] = useState<FocusProject[]>(initialProjects);
  const [open, setOpen] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [projectName, setProjectName] = useState("");

  const { selectedProject, setSelectedProject } = useFocus();

  useEffect(() => {
    setCurrentProjects(initialProjects);
  }, [initialProjects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleNewProject = async (projectName: string) => {
    const trimmedName = projectName.trim();
    if (!trimmedName) return;

    const newProject: FocusProject = {
      id: Date.now().toString(),
      name: trimmedName,
    };

    const projectId = await SaveFocusProject(newProject);
    if (projectId) newProject.id = projectId;

    setCurrentProjects((prev) => [...prev, newProject]);
    setSelectedProject(newProject);
    setProjectName("");
    setOpen(false);
  };

  const handleDeleteProject = async (project: FocusProject) => {
    const success = await DeleteFocusProject(project.id);
    if (!success) return;

    setCurrentProjects((prev) => prev.filter((p) => p.id !== project.id));

    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
    }
  };

  const handleSelect = (project: FocusProject) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
    }
    setOpen(false);
  };

  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-1">Projeto atual</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-gray-200 hover:bg-violet-300 shadow-sm transition duration-300"
          >
            {selectedProject?.name || "Selecione o projeto"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[270px] p-0 max-h-[300px]">
          <Command className="shadow-md rounded-md">
            <CommandInput placeholder="Buscar projeto..." className="h-9" />
            <CommandList>
              <CommandEmpty>Nenhum projeto encontrado.</CommandEmpty>
              <CommandGroup>
                {currentProjects.map((project) => (
                  <CommandItem
                    key={project.id}
                    onSelect={() => handleSelect(project)}
                    className={cn(
                      "cursor-pointer transition-colors duration-300 relative pr-8",
                      "hover:bg-violet-100",
                      selectedProject?.id === project.id && "bg-violet-300"
                    )}
                  >
                    {project.name}
                    <DeleteProjectButton
                      hoveredProjectId={hoveredProjectId}
                      setHoveredProjectId={setHoveredProjectId}
                      handleDeleteProject={handleDeleteProject}
                      projetc={project}
                      selectedProject={selectedProject}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <AddNewProject
              isProjectListEmpty={currentProjects.length === 0}
              showButton={showButton}
              setShowButton={setShowButton}
              projectName={projectName}
              handleInputChange={handleInputChange}
              handleNewProject={handleNewProject}
            />
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
