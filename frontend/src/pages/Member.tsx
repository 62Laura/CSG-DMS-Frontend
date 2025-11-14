import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  PieChart as PieChartIcon, 
  TrendingUp, 
  FileText, 
  Calendar, 
  Home, 
  LogOut,
  Bell,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

// Import components
import { MemberStatsCard } from "@/components/member/MemberStatsCard";
import { SavingsChart } from "@/components/member/SavingsChart";
import { ContributionsChart } from "@/components/member/ContributionsChart";
import { RecentTransactions } from "@/components/member/RecentTransactions";
import { UpcomingEvents } from "@/components/member/UpcomingEvents";

// Import API functions
import { 
  getMemberStats, 
  getMemberSavingsChart, 
  getMemberContributionsChart,
  getMemberTransactions,
  getGroupActivities
} from "@/lib/api";

// Mock data for demonstration
const mockSavingsData = [
  { name: 'Jan', value: 50000 },
  { name: 'Feb', value: 80000 },
  { name: 'Mar', value: 120000 },
  { name: 'Apr', value: 90000 },
  { name: 'May', value: 150000 },
  { name: 'Jun', value: 180000 },
];

const mockContributionsData = [
  { name: 'Savings', value: 1200000 },
  { name: 'Loan Repayment', value: 450000 },
  { name: 'Emergency Fund', value: 150000 },
  { name: 'Social Fund', value: 50000 },
];

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Fetch data
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['memberStats'],
    queryFn: getMemberStats,
  });

  const { data: savingsData = mockSavingsData, isLoading: savingsLoading } = useQuery({
    queryKey: ['memberSavingsChart'],
    queryFn: getMemberSavingsChart,
  });

  const { data: contributionsData = mockContributionsData, isLoading: contributionsLoading } = useQuery({
    queryKey: ['memberContributionsChart'],
    queryFn: getMemberContributionsChart,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['memberTransactions'],
    queryFn: () => getMemberTransactions(),
  });

  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ['memberUpcomingEvents'],
    queryFn: () => getGroupActivities(3),
  });

  // Stats cards data
  const statCards = [
    {
      label: "Total Savings",
      value: stats ? `RWF ${(stats.totalSavings || 0).toLocaleString()}`  : "Loading...",
      change: "+15%",
      icon: TrendingUp
    },
    {
      label: "Monthly Savings",
      value: stats ? `RWF ${(stats.monthlySavings || 0).toLocaleString()}`  : "Loading...",
      change: "+8%",
      icon: PieChartIcon
    },
    {
      label: "Group Contributions",
      value: stats ? `RWF ${(stats.groupContributions || 0).toLocaleString()}`  : "Loading...",
      change: "+12%",
      icon: FileText
    },
    {
      label: "Personal Goal",
      value: stats ? `${Math.min(100, Math.round(((stats.totalSavings || 0) / (stats.personalGoal || 1)) * 100))}%`  : "Loading...",
      change: "75%",
      icon: Calendar
    }
  ];

  if (statsError) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          Error loading member data: {statsError.message}
        </div>
      </div>
    );
  }
  
  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'savings', label: 'My Savings', icon: TrendingUp },
    { id: 'loans', label: 'My Loans', icon: FileText },
    { id: 'meetings', label: 'Meetings', icon: Calendar },
  ];

  // Handle logout
  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <header className="lg:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-semibold">Member Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">U</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg`}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-primary">CSG-DMS</h2>
              <p className="text-xs text-gray-500">Member Portal</p>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-64 pt-16 lg:pt-6 px-4 pb-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Member!</h1>
            <p className="text-gray-600">Here's what's happening with your account today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MemberStatsCard
                  title={stat.label}
                  value={stat.value}
                  change={stat.change}
                  icon={stat.icon}
                />
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <h2 className="text-lg font-semibold mb-4">Savings Trend</h2>
              <SavingsChart data={savingsData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <h2 className="text-lg font-semibold mb-4">Contributions Breakdown</h2>
              <ContributionsChart data={contributionsData} />
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
              <RecentTransactions transactions={transactions.map(tx => ({
                ...tx,
                description: tx.reference,  // Map reference to description
                date: tx.date instanceof Date ? tx.date.toISOString().split('T')[0] : tx.date  // Ensure date is a string
              }))} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
              <UpcomingEvents events={upcomingEvents.map(event => ({
                ...event,
                date: event.date.toISOString()
              }))} />
            </motion.div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default MemberDashboard;