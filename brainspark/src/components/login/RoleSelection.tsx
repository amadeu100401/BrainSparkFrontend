import { PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { GraduationCap, BriefcaseBusiness, Clock, Check, LucideIcon} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "TimeManagement",
    name: "Time Manager",
    icon: <Clock className="w-4 h-4" />,
  },
  // { TODO: Bloqueado por enquanto
  //   id: "Professional",
  //   name: "Professional",
  //   icon: <BriefcaseBusiness className="w-4 h-4" />,
  // },
  {
    id: "Student",
    name: "Student",
    icon: <GraduationCap className="w-4 h-4" />,
  },
];

interface RoleSelectionProps {
  handleRoleSelected: (roles: {    
    icon: LucideIcon;
    title: string;}) => void;
}

export default function RoleSelection({ handleRoleSelected }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  function selectRole(roleId: string) {
    const newRole = roleId === selectedRole ? null : roleId;
    setSelectedRole(newRole);
    
    if (newRole) {
      const roleObj = roles.find((role) => role.id === newRole);
      if (roleObj) {
        handleRoleSelected({
          icon: roleObj.icon.type,
          title: roleObj.name,
        });
      }
    }
  }

  return (
    <PopoverContent
      align="start"
      sideOffset={4}
      className="w-full p-0 select-none z-50 border border-gray-100 rounded-md shadow-lg"
    >
      <Command>
        <CommandList className="flex flex-col gap-2 py-2">
          <CommandGroup className="w-full gap-1">
            {roles.map((item) => {
              const isSelected = selectedRole === item.id;
              return (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => selectRole(item.id)}
                  className={cn(
                    "cursor-pointer px-4 py-2 rounded-md flex items-center justify-between transition-colors duration-150 hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <Check
                    className={cn(
                      "w-4 h-4 transition-opacity",
                      isSelected ? "opacity-100 text-violet-500" : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
}
