import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard,
  User as UserIcon,
  CheckCircle,
  Settings as SettingsIcon,
  Users as UsersIcon,
  Shield as ShieldIcon,
  type LucideIcon,
  BarChart2 as AnalyticsIcon,
  Database as DatabaseIcon,
} from "lucide-react";

// Superadmin Components
import { SuperadminNavbar } from "@/components/superadmin/SuperadminNavbar";
import SuperadminProfile from "@/components/superadmin/SuperadminProfile";
import MembershipApprovals from "@/components/superadmin/MembershipApprovals";
import SystemSettings from "@/components/superadmin/SystemSettings";
import SuperadminDashboard from "@/components/superadmin/SuperadminOverview";
import UserManagement from "@/components/superadmin/UserManagement";
import { motion } from "framer-motion";
// Types
export type Section = {
  id: string;
  title: string;
  component: React.ComponentType;
  icon: LucideIcon;
};

// Available superadmin sections
export const superadminSections: Section[] = [

  {
    id: "users",
    title: "User Management",
    component: UserManagement,
    icon: UsersIcon,
  },
  {
    id: "approvals",
    title: "Approvals",
    component: MembershipApprovals,
    icon: CheckCircle,
  },
  {
    id: "settings",
    title: "System Settings",
    component: SystemSettings,
    icon: SettingsIcon,
  },
  {
    id: "profile",
    title: "My Profile",
    component: SuperadminProfile,
    icon: UserIcon,
  }
 ];

// Animation variants
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 20 }
};

// Animated component wrapper
const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

// Main Superadmin component with navbar and sections
const Superadmin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const ActiveComponent = superadminSections.find(
    (section) => section.id === activeSection
  )?.component || (() => <div>Section not found</div>);

  return (
    <div className="flex h-screen bg-gray-50">
      <SuperadminNavbar
        sections={superadminSections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      <main 
        className={`flex-1 overflow-auto transition-all duration-300 ${
          collapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
        style={{
          marginTop: '64px', // Add top margin for mobile header
          height: 'calc(100vh - 64px)', // Adjust height for mobile header
        }}
      >
        <div className="p-4 md:p-6">
          <AnimatePresence mode="wait">
            <AnimatedPage key={activeSection}>
              <ActiveComponent />
            </AnimatedPage>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Superadmin;
