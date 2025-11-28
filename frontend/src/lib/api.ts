// API functions for Community Saving Groups

// Default admin user data
const DEFAULT_ADMIN_USER = {
  id: 'admin-123',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin' as const,
  status: 'active' as const,
  lastLogin: new Date(),
  createdAt: new Date(),
  permissions: ['view_dashboard', 'manage_users', 'manage_settings'],
  avatar: '/default-avatar.png'
};

// User related functions
export async function getCurrentUser() {
  try {
    // In a real app, you would use the token from localStorage
    const token = localStorage.getItem('token');
    
    // If in development mode or no token, return default admin user
    if (process.env.NODE_ENV === 'development' || !token) {
      console.log('Using default admin user for development');
      return DEFAULT_ADMIN_USER;
    }

    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    });

    const contentType = response.headers.get('content-type');
    
    // Check if response is HTML (which would mean we're not properly authenticated)
    if (contentType && contentType.includes('text/html')) {
      const text = await response.text();
      if (text.startsWith('<!DOCTYPE html>')) {
        console.warn('Received HTML response instead of JSON, using default admin user');
        return DEFAULT_ADMIN_USER;
      }
    }

    if (!response.ok) {
      console.warn(`API returned ${response.status}, using default admin user`);
      return DEFAULT_ADMIN_USER;
    }

    const userData = await response.json();
    
    // Transform the API response to match the User type
    return {
      ...userData,
      status: userData.status || 'active',
      lastLogin: userData.lastLogin ? new Date(userData.lastLogin) : new Date(),
      createdAt: userData.createdAt ? new Date(userData.createdAt) : new Date(),
      permissions: userData.permissions || [],
      role: mapRole(userData.role || 'user')
    };
  } catch (error) {
    console.error('Error fetching current user:', error);
    // Return default admin user in case of any error
    return DEFAULT_ADMIN_USER;
  }
}

// Helper function to map role values
function mapRole(role: string): 'admin' | 'moderator' | 'user' {
  const roleMap: Record<string, 'admin' | 'moderator' | 'user'> = {
    'superadmin': 'admin',
    'admin': 'admin',
    'moderator': 'moderator',
    'member': 'user'
  };
  return roleMap[role] || 'user';
}

// These are placeholder functions that will be replaced with real API calls

export interface MemberStats {
  totalSavings: number;
  monthlySavings: number;
  groupContributions: number;
  personalGoal: number;
}

export interface AdminStats {
  totalMembers: number;
  totalSavings: number;
  activeGroups: number;
  monthlyGrowth: number;
}

export interface SuperAdminStats {
  totalUsers: number;
  totalSavings: number;
  totalGroups: number;
  systemHealth: number;
  activeUsers: number;
}

export interface GroupActivity {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'meeting' | 'contribution' | 'loan' | 'other';
  status: 'upcoming' | 'completed' | 'cancelled';
  participants: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface Transaction {
  id: string;
  date: Date | string;
  member: string;
  type: 'deposit' | 'withdrawal' | 'loan_payment' | 'contribution';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

// Member API functions
export const getMemberStats = async (): Promise<MemberStats> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    totalSavings: 250000,
    monthlySavings: 15000,
    groupContributions: 5000,
    personalGoal: 500000,
  };
};

export const getMemberSavingsChart = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 18000 },
    { name: 'Apr', value: 14000 },
    { name: 'May', value: 16000 },
    { name: 'Jun', value: 19000 },
  ];
};

export const getMemberContributionsChart = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { name: 'Group A', value: 3000 },
    { name: 'Group B', value: 2500 },
    { name: 'Group C', value: 2000 },
    { name: 'Group D', value: 1500 },
  ];
};

export const getMemberTransactions = async (memberId?: string): Promise<Transaction[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data - in a real app, this would come from an API
  const mockTransactions: Transaction[] = [
    {
      id: 'txn-mem-1',
      date: new Date(),
      member: memberId || 'current-user',
      type: 'deposit',
      amount: 1000,
      status: 'completed',
      reference: 'DEP-001'
    },
    {
      id: 'txn-mem-2',
      date: new Date(Date.now() - 86400000), // Yesterday
      member: memberId || 'current-user',
      type: 'contribution',
      amount: 500,
      status: 'completed',
      reference: 'CONT-001'
    }
  ];

  return mockTransactions;
};

// Admin API functions
export const getAdminStats = async (): Promise<AdminStats> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    totalMembers: 1250,
    totalSavings: 25000000,
    activeGroups: 45,
    monthlyGrowth: 8.5,
  };
};

export const getAdminSavingsChart = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { name: 'Jan', value: 2000000 },
    { name: 'Feb', value: 2200000 },
    { name: 'Mar', value: 2400000 },
    { name: 'Apr', value: 2300000 },
    { name: 'May', value: 2500000 },
    { name: 'Jun', value: 2600000 },
  ];
};

export const getAdminMembersChart = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { name: 'District A', value: 300 },
    { name: 'District B', value: 250 },
    { name: 'District C', value: 200 },
    { name: 'District D', value: 150 },
    { name: 'District E', value: 100 },
  ];
};

export const getAdminGroupsChart = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { name: 'Active', value: 8 },
    { name: 'Inactive', value: 2 },
    { name: 'Pending', value: 1 },
  ];
};

export interface Transaction {
  id: string;
  date: Date | string;
  member: string;
  type: 'deposit' | 'withdrawal' | 'loan_payment' | 'contribution';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export const getAdminTransactions = async (): Promise<Transaction[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock transaction data - replace with actual API call
  return [
    {
      id: 'txn-1',
      date: new Date('2023-11-01'),
      member: 'John Doe',
      type: 'deposit',
      amount: 5000,
      status: 'completed',
      reference: 'DEP-001'
    },
    {
      id: 'txn-2',
      date: new Date('2023-11-02'),
      member: 'Jane Smith',
      type: 'withdrawal',
      amount: 2000,
      status: 'completed',
      reference: 'WDL-001'
    },
    {
      id: 'txn-3',
      date: new Date('2023-11-03'),
      member: 'Michael Brown',
      type: 'loan_payment',
      amount: 1000,
      status: 'completed',
      reference: 'LOAN-001'
    },
    {
      id: 'txn-4',
      date: '2023-11-04',
      member: 'Sarah Johnson',
      type: 'contribution',
      amount: 1500,
      status: 'pending',
      reference: 'CONT-001'
    },
    {
      id: 'txn-5',
      date: '2023-11-05',
      member: 'David Wilson',
      type: 'deposit',
      amount: 3000,
      status: 'failed',
      reference: 'DEP-002'
    }
  ];
};

// Super Admin API functions
export const getSuperAdminStats = async (): Promise<SuperAdminStats> => {

  return {
    totalUsers: 5000,
    totalSavings: 100000000,
    totalGroups: 200,
    systemHealth: 98.5,
    activeUsers: 4230,

  };
};

// Public stats for index page
export interface PublicStats {
  communitiesServed: string;
  timeSaved: string;
  disputeReduction: string;
  trustLevel: string;
}

export const getPublicStats = async (): Promise<PublicStats> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    communitiesServed: "2M+",
    timeSaved: "40%",
    disputeReduction: "60%",
    trustLevel: "95%",
  };
};

export const getSuperAdminSavingsChart = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { name: 'Jan', value: 8000000 },
    { name: 'Feb', value: 8500000 },
    { name: 'Mar', value: 9000000 },
    { name: 'Apr', value: 8800000 },
    { name: 'May', value: 9500000 },
    { name: 'Jun', value: 10000000 },
  ];
};

export const getSuperAdminUsersChart = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { name: 'Members', value: 4000 },
    { name: 'Admins', value: 500 },
    { name: 'Super Admins', value: 50 },
  ];
};

export const getSuperAdminGroupsChart = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { name: 'Active', value: 180 },
    { name: 'Inactive', value: 20 },
  ];
};

export const getSuperAdminSystemHealth = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { name: 'Uptime', value: 98.5 },
    { name: 'Performance', value: 95.2 },
    { name: 'Security', value: 99.8 },
  ];
};

// Group Activities API
export const getGroupActivities = async (limit?: number): Promise<GroupActivity[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - in a real app, this would come from an API
  const activities: GroupActivity[] = [
    {
      id: 'act-1',
      title: 'Monthly Group Meeting',
      description: 'Regular monthly meeting to discuss group savings and loans',
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      type: 'meeting',
      status: 'upcoming',
      participants: 15
    },
    {
      id: 'act-2',
      title: 'Loan Repayment Due',
      description: 'Monthly loan repayment collection',
      date: new Date(Date.now() + 86400000 * 5), // 5 days from now
      type: 'loan',
      status: 'upcoming',
      participants: 8
    },
    {
      id: 'act-3',
      title: 'Emergency Fund Contribution',
      description: 'Monthly emergency fund collection',
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      type: 'contribution',
      status: 'completed',
      participants: 20
    }
  ];

  // Apply limit if provided, otherwise return all activities
  return limit ? activities.slice(0, limit) : activities;
};
