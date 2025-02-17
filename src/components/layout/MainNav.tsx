import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, LayoutGrid } from "lucide-react";

export function MainNav() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="border-b bg-background">
      <div className="flex h-16 items-center px-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={() => navigate("/")}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Tier Lists
              </NavigationMenuLink>
            </NavigationMenuItem>

            {user?.role === "admin" && (
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => navigate("/admin")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Admin
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigate("/profile")}
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
