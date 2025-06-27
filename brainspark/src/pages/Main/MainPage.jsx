import Sidebar from "../../components/home/sidebar/App-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom"; 

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"

export default function MainPage() {
  return (
    <SidebarProvider className="select-none">
      {/* Sidebar */}
      <Sidebar />

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 transition-[width,height] 
        ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-gray-50 shadow-sm">
          <div className="flex items-center gap-2 px-4 bg-gray-50">
            <SidebarTrigger className="-ml-1 bg-gray-50" />
            <Separator
              orientation="vertical"
              tabIndex={-1}
              className="mr-2 data-[orientation=vertical]:h-4 border-t border-border 
                        select-none pointer-events-none 
                        focus:outline-none focus:ring-0 focus-visible:ring-0 
                        outline-none"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col pt-0 bg-gray-100 max-h-screen">
          <Outlet />
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
