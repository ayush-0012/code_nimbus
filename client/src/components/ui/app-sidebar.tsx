import {
  Users,
  Clock,
  FileSpreadsheet,
  Folder,
  Trash2,
  Share2,
  Cog,
  FileText,
  FolderOpen,
  GitFork,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-black text-white">
        <SidebarGroup>
          <SidebarHeader className="px-3 py-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded border border-zinc-700"></div>
              <div className="flex items-center gap-1">
                <span className="font-medium">username</span>
                {/* <ChevronDown className="h-4 w-4 text-zinc-400" /> */}
              </div>
            </div>
          </SidebarHeader>
          <SidebarGroupContent>
            {/* FIRST MENU SECTION */}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Clock className="h-4 w-4" />
                  <span>Recent</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Cog className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Users className="h-4 w-4" />
                  <span>Invite members</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <FileText className="h-4 w-4" />
                  <span>Get started</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {/* SECOND MENU SECTION */}
            <div className="mt-6 px-3 py-2">
              <h3 className="text-lg font-medium text-zinc-400">
                Repositories
              </h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-md">
                  <FolderOpen className="h-4 w-4" />
                  <span>All repositories</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <GitFork className="h-4 w-4" />
                  <span>My contributions</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {/* THIRD MENU SECTION */}
            <div className="mt-6 px-3 py-2">
              <h3 className="text-lg font-medium text-zinc-400">
                Devboxes and Sandboxes
              </h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <FileText className="h-4 w-4" />
                  <span>Drafts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Folder className="h-4 w-4" />
                  <span>All folders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Trash2 className="h-4 w-4" />
                  <span>Recently deleted</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* FOURTH MENU SECTION */}
            <div className="mt-6 px-3 py-2">
              <h3 className="text-lg font-medium text-zinc-400">Shared</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Share2 className="h-4 w-4" />
                  <span>Shared with me</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
