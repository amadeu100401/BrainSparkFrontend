import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

import NavMain from "@/components/home/sidebar/Nav-main"
import UserMenu from "@/components/home/sidebar/UserMenu"
import NavHeader from "@/components/home/sidebar/Nav-header"

export default function sidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar 
            collapsible="icon"
            color=""
            {...props}
        >
            <SidebarHeader>
                <NavHeader />
            </SidebarHeader>

            <SidebarContent>
                <NavMain />
            </SidebarContent>

            <SidebarFooter>
                <UserMenu user={{avatar: "https://res.cloudinary.com/dga19vu3g/image/upload/v1746047938/xkauhzjvtpav9xa5aqjk.png", email: "emailTeste@gmail.com", name: "Teste name"}}/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}