import { MainNav } from "./MainNav";
import { PublicNav } from "./PublicNav";

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function Layout({ children, isAuthenticated }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? <MainNav /> : <PublicNav />}
      <main>{children}</main>
    </div>
  );
}
