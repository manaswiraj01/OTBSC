import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Map,
  ClipboardList,
  CreditCard,
  Calendar,
  Users,
} from "lucide-react";

export function NavMain() {
  const { pathname } = useLocation();

  const isExactActive = (path) => pathname === path;
  const isNestedActive = (path) => pathname.startsWith(path);

  // const activeClass =
  //   "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground";

  const activeClass =
  "data-[active=true]:bg-blue-600 data-[active=true]:text-white";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {/* Dashboard */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isExactActive("/dashboard")}
            className={activeClass}
          >
            <Link to="/dashboard">
              <LayoutDashboard className="size-4" />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Places */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isNestedActive("/dashboard/places")}
            className={activeClass}
          >
            <Link to="/dashboard/places">
              <Map className="size-4" />
              <span>Places</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Bookings */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isNestedActive("/dashboard/bookings")}
            className={activeClass}
          >
            <Link to="/dashboard/bookings">
              <ClipboardList className="size-4" />
              <span>Bookings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Payments */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isNestedActive("/dashboard/payments")}
            className={activeClass}
          >
            <Link to="/dashboard/payments">
              <CreditCard className="size-4" />
              <span>Payments</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Events */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isNestedActive("/dashboard/events")}
            className={activeClass}
          >
            <Link to="/dashboard/events">
              <Calendar className="size-4" />
              <span>Events</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Users */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isNestedActive("/dashboard/users")}
            className={activeClass}
          >
            <Link to="/dashboard/users">
              <Users className="size-4" />
              <span>Users</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
