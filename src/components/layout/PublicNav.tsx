import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";

export function PublicNav() {
  const navigate = useNavigate();

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
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button onClick={() => navigate("/signup")}>Sign Up</Button>
        </div>
      </div>
    </div>
  );
}
