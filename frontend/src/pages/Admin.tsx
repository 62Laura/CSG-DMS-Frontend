import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate} from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminProfile from '../components/admin/AdminProfile';
import MembershipRegistration from '../components/admin/MembershipRegistration';
import MembersList from '../components/admin/MembersList';
import AdminSetting from '../components/admin/AdminSetting';
import SystemSettings from '../components/admin/SystemSettings';
import { getCurrentUser } from '../lib/api';
import { User } from '../types/admin.types';
import { useAuth } from '../contexts/AuthContext';

// Define the admin sections type
type AdminSection = 'dashboard' | 'profile' | 'add-member' | 'view-members' | 'settings' | 'system-settings';

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Derive active section from URL
  const getActiveSection = (pathname: string): AdminSection => {
    const section = pathname.split('/').pop();
    
    // Map URL segments to section IDs
    const sectionMap: Record<string, AdminSection> = {
      'admin': 'dashboard',
      'dashboard': 'dashboard',
      'profile': 'profile',
      'add-member': 'add-member',
      'members': 'view-members',
      'settings': 'settings',
      'system-settings': 'system-settings'
    };
    
    return sectionMap[section as string] || 'dashboard';
  };
  
  const [activeSection, setActiveSection] = useState<AdminSection>(getActiveSection(location.pathname));

  // Update active section when URL changes
  useEffect(() => {
    setActiveSection(getActiveSection(location.pathname));
  }, [location.pathname]);

  // Fetch current user data
  const { data: currentUser, isLoading, error } = useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: 1,
    throwOnError: false,
  });

  // Handle error for default user fallback
  useEffect(() => {
    if (error) {
      console.log('Error fetching user, using default admin user');
    }
  }, [error]);

  // Handle section change
  const handleSectionChange = (section: string) => {
    navigate(`/admin/${section}`);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to access the admin dashboard. Please log in and try again.
          </p>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Render the appropriate section based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'profile':
        return <AdminProfile />;
      case 'add-member':
        return <MembershipRegistration />;
      case 'view-members':
        return <MembersList />;
      case 'settings':
        return <AdminSetting />;
      case 'system-settings':
        return <SystemSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  // Main admin layout with the active section
  return (
    <AdminLayout 
      activeSection={activeSection} 
      onSectionChange={handleSectionChange}
    >
      {renderSection()}
    </AdminLayout>
  );
};

export default Admin;