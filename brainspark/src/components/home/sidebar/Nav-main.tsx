import {
    Clock,
    Home,
    ChartColumn,
    Target,
  } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
  } from "@/components/ui/sidebar"
  
export default function NavMain() {

    return(
        <SidebarGroup className="pt-6">
            <SidebarGroupLabel>Navegação</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={"Home"}>
                        <a href={"/brainspark/home"}>
                            <Home />
                            <span>Início</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={"Focus timer"}>
                        <a href={"/brainspark/focus"}>
                            <Clock />
                            <span>Focus Timer</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={"Focus timer"}>
                        <a href={""}>
                            <Target />
                            <span>Objetivos</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={"Focus timer"}>
                        <a href={""}>
                            <ChartColumn />
                            <span>Relatórios</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}