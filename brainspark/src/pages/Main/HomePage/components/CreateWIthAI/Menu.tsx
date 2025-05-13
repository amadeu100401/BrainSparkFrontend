import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useState, useRef } from "react";

export function MenuTextArea() {
  const [aiEngineer, setAiEngineer] = useState("OpenAi");
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (value: string) => {
    setAiEngineer(value);
    // Delay para permitir que o menu feche naturalmente
    setTimeout(() => {
      triggerRef.current?.blur();
    }, 50);
  };

  return (
    <Menubar className="bg-zinc-700 border-none">
      <MenubarMenu>
        <MenubarTrigger
          ref={triggerRef}
          className="bg-zinc-700 text-zinc-50 
            hover:bg-zinc-700 
            focus:outline-none focus:ring-0 
            active:bg-zinc-800 
            data-[state=open]:bg-zinc-800 
            transition-colors duration-200"
        >
          <span className="transition-all duration-300 ease-in-out">
            {aiEngineer}
          </span>
        </MenubarTrigger>

        <MenubarContent className="bg-zinc-700 text-zinc-100 border border-zinc-800 shadow-md rounded-md">
          <MenubarRadioGroup value={aiEngineer} onValueChange={handleSelect}>
            <MenubarRadioItem value="DeepSeeker">DeepSeeker</MenubarRadioItem>
            <MenubarRadioItem value="ChatGtpV4.0">ChatGtpV4.0</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
