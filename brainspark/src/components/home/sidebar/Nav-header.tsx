import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "@/components/ui/sidebar"

import { ClockIcon } from "lucide-react"

export default function NavHeader() {
    const { isMobile } = useSidebar()

    return(
        <SidebarMenu>
            <div
              className="flex items-center gap-4 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <ClockIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate text-xl font-medium">BrainSpark</span>
                    <span className="truncate text-xs font-thin text-gray-400">Plano gratuito</span>
                </div>
            </div>
        </SidebarMenu>
    )
}