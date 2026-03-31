import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function Admin() {
  return (
    <div className="[--header-height:calc(var(--spacing)*14)]">
      <SidebarProvider className="flex flex-col">
        {/* Top Header */}
        <SiteHeader />

        {/* Body */}
        <div className="flex flex-1 min-w-0"> {/* 🔥 FIX 1 */}
          {/* Sidebar */}
          <AppSidebar />

          {/* MAIN CONTENT */}
          <SidebarInset className="min-w-0"> {/* 🔥 FIX 2 */}
            <div className="flex flex-1 flex-col gap-4 p-4 min-w-0"> {/* 🔥 FIX 3 */}
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}