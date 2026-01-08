import {
  LayoutDashboardIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  PlusCircleIcon,
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    url: "/dashboard",
  },
  {
    title: "Tasks",
    icon: ClockIcon,
    url: "/tasks",
  },
  {
    title: "Completed",
    icon: CheckCircleIcon,
    url: "/completed",
  },
  {
    title: "Profile",
    icon: UserIcon,
    url: "/profile",
  },
]

export function NavMain() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Add Task Button */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Add Task"
              onClick={() => navigate("/tasks")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <PlusCircleIcon className="h-4 w-4" />
              <span>Add Task</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Navigation Menu */}
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => navigate(item.url)}
                data-active={location.pathname === item.url}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
