
import { 
  BarChart2, 
  Users, 
  History, 
  Home, 
  Settings, 
  Bell, 
  UserCog,
  LogOut
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { LogoutConfirmDialog } from "./LogoutConfirmDialog";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Desempenho",
    path: "/performance",
    icon: BarChart2,
  },
  {
    title: "Trabalhadores",
    path: "/workers",
    icon: Users,
  },
  {
    title: "Histórico de Treinamentos",
    path: "/history",
    icon: History,
  },
  {
    title: "Notificações",
    path: "/notifications",
    icon: Bell,
  },
  {
    title: "Configurações",
    path: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProfile, logout } = useUser();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded">
              <UserCog className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-white">Port VR</h1>
              <p className="text-xs text-white/70">Painel de Treinamento</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.path} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{userProfile.name}</p>
                  <p className="text-xs text-white/70">{userProfile.email}</p>
                </div>
              </div>
              <button 
                className="text-white/70 hover:text-white" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <LogoutConfirmDialog 
        open={showLogoutDialog} 
        onOpenChange={setShowLogoutDialog}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}
