import { ReactNode } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface ContextDisplayMenuProps {
  children: ReactNode;
}

export default function ContextDisplayMenu({children}: ContextDisplayMenuProps) {
    return(
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Editar</ContextMenuItem>
                <ContextMenuItem>Arquivar</ContextMenuItem>
                <ContextMenuItem>Excluir</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}