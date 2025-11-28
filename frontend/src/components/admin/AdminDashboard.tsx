import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import {
    Users, Settings, Shield, TrendingUp, Loader2, Activity,
    DollarSign, Target, Clock, FileText, Bell, CheckCircle, AlertCircle, X, Search, Filter, Download, MoreHorizontal,
    ArrowUpRight, ArrowDownRight, Plus
} from "lucide-react";
import {
    getAdminStats,
    getAdminSavingsChart,
    getAdminMembersChart,
    getAdminGroupsChart,
    getAdminTransactions
} from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {LoansList, ReportsSection, TransactionsList} from "@/components/admin/AdminComponents.tsx";

// Mock data for notifications
const notifications = [
  { id: 1, type: 'info', message: 'New member registration pending approval', time: '10 mins ago', read: false },
  { id: 2, type: 'success', message: 'Loan payment received from John Doe', time: '2 hours ago', read: true },
  { id: 3, type: 'warning', message: 'Low balance in group account', time: '5 hours ago', read: false },
];

// Mock data for activity feed
const activityFeed = [
  { id: 1, action: 'New member', details: 'Alice Johnson joined Kigali Women Group', time: '2 mins ago', icon: 'user-plus' },
  { id: 2, action: 'Payment', details: 'Received RWF 50,000 from John Doe', time: '30 mins ago', icon: 'dollar-sign' },
  { id: 3, action: 'Loan', details: 'Approved loan for Marie Uwimana', time: '1 hour ago', icon: 'hand-holding-usd' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);// Example count

  // Stats and Charts
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getAdminStats,
  });

  const { data: savingsChart, isLoading: savingsLoading } = useQuery({
    queryKey: ['adminSavingsChart'],
    queryFn: getAdminSavingsChart,
  });

  const { data: membersChart, isLoading: membersLoading } = useQuery({
    queryKey: ['adminMembersChart'],
    queryFn: getAdminMembersChart,
  });

  const { data: groupsChart, isLoading: groupsLoading } = useQuery({
    queryKey: ['adminGroupsChart'],
    queryFn: getAdminGroupsChart,
  });

  // Fetch transactions data
  const { 
    data: transactionsData = [], 
    isLoading: transactionsLoading,
    error: transactionsError 
  } = useQuery({
    queryKey: ['adminTransactions'],
    queryFn: getAdminTransactions,
  });

  // Transform data for transactions display with proper typing
  const transactions = transactionsData.map((item: any, index: number) => ({
    id: item.id || `txn-${index}`,
    date: item.date || new Date(),
    member: item.member || 'Unknown',
    type: item.type || 'deposit',
    amount: item.amount || 0,
    status: item.status || 'completed',
    reference: item.reference || `ref-${index}`
  }));

  // Mock data for loans since getLoans is not available
  const loans = [];
  const loansLoading = false;

  // Mock data for reports since getReports is not available
  const reports = [];
  const reportsLoading = false;

  // State for unread notifications count
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter(notification => !notification.read).length
  );

  // Mark notification as read
  const markAsRead = (id: number) => {
    // In a real app, this would update the backend
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    // Update local state
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
  };

  // Tabs configuration
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'loans', label: 'Loans' },
    { id: 'reports', label: 'Reports' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const statCards = [
    {
      label: "Total Members",
      value: stats ? stats.totalMembers.toLocaleString() : "Loading...",
      change: "+12%",
      icon: Users,
      tooltip: "Total number of members in your groups"
    },
    {
      label: "Total Savings",
      value: stats ? `RWF ${(stats.totalSavings / 1000000).toFixed(1)}M` : "Loading...",
      change: "+18%",
      icon: DollarSign,
      tooltip: "Total amount of savings accumulated"
    },
    {
      label: "Active Groups",
      value: stats ? stats.activeGroups.toString() : "Loading...",
      change: "+5%",
      icon: Shield,
      tooltip: "Number of active saving groups"
    },
    {
      label: "Monthly Growth",
      value: stats ? `${stats.monthlyGrowth}%` : "Loading...",
      change: "+2.1%",
      icon: TrendingUp,
      tooltip: "Monthly growth rate of savings"
    }
  ];

  if (statsError) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          Error loading admin data: {statsError.message}
        </div>
      </div>
    );
  }

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'transactions':
        return <TransactionsList transactions={transactions} loading={transactionsLoading} />;
      case 'loans':
        return <LoansList loans={loans} loading={loansLoading} />;
      case 'reports':
        return <ReportsSection reports={reports} loading={reportsLoading} />;
      case 'dashboard':
      default:
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-soft border hover:shadow-md transition-shadow duration-200"
                  title={stat.tooltip}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                      <p className="text-sm text-green-600 mt-1 flex items-center">
                        {stat.change.startsWith('+') ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Savings Chart */}
              <div className="lg:col-span-2 bg-card p-6 rounded-xl shadow-soft border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Monthly Savings Growth</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                {savingsLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin h-8 w-8" />
                  </div>
                ) : savingsChart ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={savingsChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`RWF ${value}`, 'Savings']} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.2}
                        name="Savings Amount"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">No data available</span>
                  </div>
                )}
              </div>

              {/* Activity Feed */}
              <div className="bg-card p-6 rounded-xl shadow-soft border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {activityFeed.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Members by District */}
              <div className="bg-card p-6 rounded-xl shadow-soft border">
                <h2 className="text-xl font-semibold mb-4">Members by District</h2>
                {membersLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin h-8 w-8" />
                  </div>
                ) : membersChart ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={membersChart}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {membersChart.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} members`, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">No data available</span>
                  </div>
                )}
              </div>

              {/* Group Status */}
              <div className="bg-card p-6 rounded-xl shadow-soft border">
                <h2 className="text-xl font-semibold mb-4">Group Status Overview</h2>
                {groupsLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin h-8 w-8" />
                  </div>
                ) : groupsChart ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={groupsChart}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} groups`, 'Count']} />
                        <Bar dataKey="value" fill="#82ca9d" name="Group Count" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">No data available</span>
                  </div>
                )}
              </div>
            </div>
          </>
        );
    }
  };

  return (
      <div className="p-6 space-y-6">
        {/* Header with Tabs and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border z-10">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-muted/50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className={`p-1 rounded-full mr-3 ${
                            notification.type === 'success' ? 'bg-green-100 text-green-600' :
                            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {notification.type === 'success' ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : notification.type === 'warning' ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <Bell className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full ml-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t text-center">
                    <Button variant="ghost" size="sm" className="text-primary">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Actions */}
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </Tabs>
      </div>
  );
};

export default AdminDashboard;
