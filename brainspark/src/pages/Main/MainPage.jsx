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
      <div className="h-screen flex overflow-hidden bg-zinc-900 text-black">
        {/* Sidebar */}
        <Sidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 select-none"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>

        {/* Main content area */}
        <div className="flex-1 flex flex-col pl-20 select-none">
          <main className="flex-1 p-6 bg-zinc-850 text-black">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
