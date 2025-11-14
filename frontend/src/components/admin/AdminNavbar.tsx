import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Custom hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkIfMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [checkIfMobile]);

  return isMobile;
};
import {
    User,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    UserPlus as UserAddIcon,
    Users as UsersIcon,
    ServerCog,
    Home,
    Briefcase,
    Sliders,
    Loader2, UserCog
} from 'lucide-react';
import { cn } from '../../lib/utils';

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  group?: string;
  path?: string;
};

type NavGroup = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface AdminNavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const NAV_GROUPS: NavGroup[] = [
  { id: 'main', label: 'Main', icon: Home },
  { id: 'management', label: 'Management', icon: Briefcase },
  { id: 'settings', label: 'Settings', icon: Sliders },
];

// NavItem component is defined later in the file

const AdminNavbar = ({ 
  activeSection, 
  onSectionChange, 
  collapsed = false, 
  onCollapsedChange 
}: AdminNavbarProps) => {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Navigation items organized by groups
  const navItems: NavItem[] = [

    // Management
    { 
      id: 'add-member', 
      label: 'Add Member', 
      icon: UserAddIcon, 
      group: 'management',
      path: '/admin/add-member'
    },
    { 
      id: 'view-members', 
      label: 'View Members', 
      icon: UsersIcon, 
      group: 'management',
      path: '/admin/members'
    },
    
    // Settings
    { 
      id: 'system-settings', 
      label: 'User Settings', 
      icon: ServerCog, 
      group: 'settings',
      path: '/admin/settings'
    },
  ];
  
  // Group navigation items
  const groupedNavItems = NAV_GROUPS.map(group => ({
    ...group,
    items: navItems.filter(item => item.group === group.id)
  })).filter(group => group.items.length > 0);

  // Sync internal state with prop
  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapsedChange?.(newCollapsed);
  };

  // Handle navigation with loading state
  const handleNavigation = (section: string, path?: string) => {
    setIsNavigating(true);
    onSectionChange(section);
    
    if (path) {
      navigate(path);
    }
    
    // Reset loading state after navigation is complete
    setTimeout(() => {
      setIsNavigating(false);
    }, 300);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      setIsLoggingOut(false);
    }
  };

  // Navigation item component
  const NavItem = ({ 
    item, 
    isActive, 
    onClick, 
    isCollapsed = false 
  }: { 
    item: NavItem; 
    isActive: boolean; 
    onClick: () => void; 
    isCollapsed?: boolean;
  }) => {
    const Icon = item.icon;
    const isLogout = item.id === 'logout';
    const isLoading = isNavigating && isActive;
    
    const content = (
      <>
        <Icon className={cn(
          'w-5 h-5 flex-shrink-0',
          isMobile ? 'mr-3' : isCollapsed ? '' : 'mr-3',
          isLoading && 'animate-spin'
        )} />
        {(!isCollapsed || isMobile) && (
          <span className="truncate">
            {isLoading && !isLogout ? 'Loading...' : item.label}
          </span>
        )}
      </>
    );

    if (isLogout) {
      return (
        <button
          key={item.id}
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            'w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
            isMobile ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
            isLoggingOut && 'opacity-50 cursor-not-allowed'
          )}
        >
          {content}
        </button>
      );
    }

    return (
      <NavLink
        key={item.id}
        to={item.path}
        className={({ isActive }) => 
          cn(
            'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
            isMobile 
              ? isActive 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
              : isActive
                ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
            isCollapsed && !isMobile && 'justify-center',
            isMobile ? 'text-left' : '',
            'w-full'
          )
        }
        aria-current={isActive ? 'page' : undefined}
      >
        <span className={`relative flex items-center justify-center ${isActive ? 'text-primary' : 'group-hover:text-foreground'}`}>
          <Icon className={`h-5 w-5 flex-shrink-0 ${isCollapsed && !isMobile ? '' : 'mr-3'}`} />
          {isActive && !isCollapsed && (
            <span className="absolute -left-1 w-1 h-5 bg-primary rounded-full"></span>
          )}
        </span>
        {(!isCollapsed || isMobile) && (
          <span className="truncate">{item.label}</span>
        )}
      </NavLink>
    );
  };
  
  // Handle navigation item click
  const handleNavClick = (item: NavItem) => {
    if (item.path) {
      navigate(item.path);
    }
    // Ensure we're passing a string to onSectionChange
    const sectionId = typeof item === 'string' ? item : item.id;
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Render individual navigation item
  const renderNavItem = (item: NavItem) => {
    const handleClick = () => {
      if (item.path) {
        navigate(item.path);
      }
      if (onSectionChange) {
        onSectionChange(item.id);
      }
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    };

    return (
      <NavItem
        key={item.id}
        item={item}
        isActive={activeSection === item.id}
        onClick={handleClick}
        isCollapsed={collapsed}
      />
    );
  };

  // Render navigation group
  const renderNavGroup = (group: (typeof groupedNavItems)[0]) => {
    if (isCollapsed) return null;
    
    return (
      <div key={group.id} className="mt-6 first:mt-2">
        <div className="px-4 mb-2 flex items-center text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
          <group.icon className="h-3.5 w-3.5 mr-2 opacity-60" />
          <span>{group.label}</span>
        </div>
        <div className="space-y-1">
          {group.items.map(renderNavItem)}
        </div>
      </div>
    );
  };

    const logoutItem = {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
      path: '/logout'
    };
    return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-card border border-border shadow-sm hover:bg-muted/50 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 z-40 flex flex-col transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'left-0 w-72' : '-left-full w-0'}
          md:left-0 md:w-16 md:data-[collapsed=true]:w-16 md:data-[collapsed=false]:w-64`}
        data-collapsed={isCollapsed}
      >
        <div className="flex flex-col flex-grow bg-card/95 backdrop-blur-sm border-r border-border/50 shadow-xl">
          {/* Header */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 border-b border-border/50`}>
            {!isCollapsed && (
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.fullName || 'User'}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm font-semibold text-foreground truncate">
                    {user?.fullName || 'Admin User'}
                  </h1>
                  <p className="text-xs text-muted-foreground truncate">Administrator</p>
                </div>
              </div>
            )}
            
            {/* Collapse button in header for mobile */}
            <button
              onClick={toggleCollapse}
              className={`p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ${
                isCollapsed ? 'mx-auto' : ''
              }`}
              aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
            {/* Main Navigation */}
            <div className="space-y-1">
              {groupedNavItems.map(group => (
                <div key={group.id}>
                  {renderNavGroup(group)}
                  {!isCollapsed && group.id !== NAV_GROUPS[NAV_GROUPS.length - 1].id && (
                    <div className="h-px bg-border/50 my-4 w-full" />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-auto pt-4">
              <div className="border-t border-border/50 pt-2">
                <NavItem 
                  item={{
                    id: 'profile',
                    label: user?.fullName || 'Profile',
                    icon: UserCog,
                    path: '/admin/profile'
                  }} 
                  isActive={location.pathname === '/admin/profile'}
                  onClick={() => navigate('/admin/profile')}
                  isCollapsed={collapsed}
                />
                <NavItem 
                  item={logoutItem} 
                  isActive={false}
                  onClick={handleLogout}
                  isCollapsed={collapsed}
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
export default AdminNavbar;
