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

import NavFocus from "@/components/home/sidebar/Nav-focus"
import UserMenu from "@/components/home/sidebar/UserMenu"

export default function sidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
            </SidebarHeader>

            <SidebarContent>
                <NavFocus />
            </SidebarContent>

            <SidebarFooter>
                <UserMenu user={{avatar: "https://res.cloudinary.com/dga19vu3g/image/upload/v1746047938/xkauhzjvtpav9xa5aqjk.png", email: "emailTeste@gmail.com", name: "Teste name"}}/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}