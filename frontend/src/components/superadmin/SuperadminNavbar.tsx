import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  User,
  CheckCircle,
  Settings,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Section } from "@/pages/Superadmin";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SuperadminNavbarProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const SuperadminNavbar: React.FC<SuperadminNavbarProps> = ({
  sections,
  activeSection,
  onSectionChange,
  collapsed = false,
  onCollapsedChange,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sync collapsed state with parent
  useEffect(() => {
    if (onCollapsedChange) {
      onCollapsedChange(collapsed);
    }
  }, [collapsed, onCollapsedChange]);

  // Handle scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleCollapse = () => {
    const newCollapsedState = !collapsed;
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsedState);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Define navigation items (excluding profile and avoiding duplicates)
  const navItems: NavItem[] = sections
    .filter(section => section.id !== "profile")
    .map(section => ({
      id: section.id,
      label: section.title,
      icon: section.icon
    }));

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-primary text-white"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full md:translate-x-0 md:w-20": collapsed,
            "translate-x-0": !collapsed,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Collapse Button */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold">SA</span>
              </div>
              {!collapsed && (
                <span className="text-xl font-semibold whitespace-nowrap">
                  Super Admin
                </span>
              )}
            </div>
            <button
              onClick={toggleCollapse}
              className="p-1 rounded-md hover:bg-accent"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                        activeSection === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile and Logout */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="font-medium">
                  {user?.fullName
                    ? user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "SA"}
                </span>
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.fullName || "Super Admin"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className={cn(
                "mt-4 w-full flex items-center space-x-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors",
                {
                  "justify-center": collapsed,
                  "justify-start": !collapsed,
                }
              )}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Sign out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default SuperadminNavbar;
