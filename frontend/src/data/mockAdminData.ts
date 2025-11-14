import {
  User, ActivityLog, SystemMetric, ApiUsage, Content, Announcement, FeatureFlag,
  DatabaseBackup, EmailTemplate, SystemSetting, ThirdPartyIntegration, Report,
  SupportTicket, ScheduledTask, DataRetentionPolicy, UserConsent
} from "@/types/admin.types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@example.com',
    fullName: 'Admin User',
    role: 'admin',
    status: 'active',
    lastLogin: new Date('2023-11-05T10:30:00Z'),
    createdAt: new Date('2023-01-15T09:00:00Z'),
    permissions: ['*']
  },
  // Add more mock users...
];

// Mock Activity Logs
export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    userId: 'user-1',
    user: 'Admin User',
    name: 'Admin User',
    email: 'admin@example.com',
    action: 'login',
    entityType: 'user',
    entityId: 'user-1',
    timestamp: new Date('2023-11-05T10:30:00Z'),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  // Add more activity logs...
];

// Mock System Metrics
export const mockSystemMetrics: SystemMetric[] = [
  {
    timestamp: new Date('2023-11-05T10:00:00Z'),
    cpuUsage: 24.5,
    memoryUsage: 65.2,
    activeUsers: 42,
    requestCount: 1250,
    errorRate: 0.5
  },
  // Add more metrics...
];

// Mock API Usage
export const mockApiUsage: ApiUsage[] = [
  {
    endpoint: '/api/users',
    method: 'GET',
    count: 1250,
    lastUsed: new Date('2023-11-05T10:30:00Z'),
    averageResponseTime: 120,
    errorRate: 0.5
  },
  // Add more API usage data...
];

// Mock Content
export const mockContent: Content[] = [
  {
    id: 'content-1',
    type: 'post',
    title: 'Welcome to our platform!',
    content: 'This is a sample post content...',
    authorId: 'user-1',
    status: 'approved',
    createdAt: new Date('2023-10-15T14:30:00Z'),
    updatedAt: new Date('2023-10-15T14:30:00Z')
  },
  // Add more content...
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'announcement-1',
    title: 'Scheduled Maintenance',
    content: 'We will be performing maintenance on...',
    startDate: new Date('2023-11-10T02:00:00Z'),
    endDate: new Date('2023-11-10T04:00:00Z'),
    isActive: true,
    priority: 'high',
    createdAt: new Date('2023-11-01T09:00:00Z'),
    createdBy: 'user-1'
  },
  // Add more announcements...
];

// Mock Feature Flags
export const mockFeatureFlags: FeatureFlag[] = [
  {
    id: 'feature-1',
    name: 'dark-mode',
    description: 'Enable dark mode for all users',
    isEnabled: true,
    targetUsers: 'all',
    createdAt: new Date('2023-09-01T00:00:00Z'),
    updatedAt: new Date('2023-09-01T00:00:00Z')
  },
  // Add more feature flags...
];

// Mock Database Backups
export const mockDatabaseBackups: DatabaseBackup[] = [
  {
    id: 'backup-1',
    name: 'backup-20231105',
    size: '2.5 GB',
    createdAt: new Date('2023-11-05T00:00:00Z'),
    createdBy: 'system',
    status: 'completed'
  },
  // Add more backups...
];

// Mock Email Templates
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'template-1',
    name: 'Welcome Email',
    subject: 'Welcome to Our Platform!',
    body: 'Hello {{user.name}}, welcome to our platform!',
    variables: ['user.name'],
    lastUpdated: new Date('2023-09-01T00:00:00Z'),
    updatedBy: 'user-1'
  },
  // Add more templates...
];

// Mock System Settings
export const mockSystemSettings: SystemSetting[] = [
  {
    id: 'setting-1',
    key: 'app.name',
    value: 'Admin Dashboard',
    type: 'string',
    description: 'Application name',
    isPublic: true,
    updatedAt: new Date('2023-09-01T00:00:00Z'),
    updatedBy: 'user-1'
  },
  // Add more settings...
];

// Mock Third-Party Integrations
export const mockIntegrations: ThirdPartyIntegration[] = [
  {
    id: 'integration-1',
    name: 'SendGrid',
    type: 'email',
    isActive: true,
    config: {
      apiKey: '*****',
      fromEmail: 'noreply@example.com'
    },
    lastSync: new Date('2023-11-05T00:00:00Z'),
    syncStatus: 'success',
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-01T00:00:00Z')
  },
  // Add more integrations...
];

// Mock Reports
export const mockReports: Report[] = [
  {
    id: 'report-1',
    name: 'Monthly User Activity',
    type: 'system',
    parameters: {
      startDate: '2023-11-01',
      endDate: '2023-11-30',
      metrics: ['activeUsers', 'pageViews']
    },
    schedule: '0 0 1 * *', // 1st of every month
    lastRun: new Date('2023-11-01T00:00:00Z'),
    nextRun: new Date('2023-12-01T00:00:00Z'),
    format: 'pdf',
    recipients: ['admin@example.com'],
    isActive: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-01T00:00:00Z'),
    createdBy: 'user-1'
  },
  // Add more reports...
];

// Mock Support Tickets
export const mockSupportTickets: SupportTicket[] = [
  {
    id: 'ticket-1',
    title: 'Login issues',
    description: 'I cannot log in to my account',
    status: 'open',
    priority: 'high',
    category: 'bug',
    createdBy: 'user-2',
    assignedTo: 'user-1',
    createdAt: new Date('2023-11-05T10:15:00Z'),
    updatedAt: new Date('2023-11-05T10:15:00Z')
  },
  // Add more tickets...
];

// Mock Scheduled Tasks
export const mockScheduledTasks: ScheduledTask[] = [
  {
    id: 'task-1',
    name: 'Nightly Database Backup',
    description: 'Creates a backup of the database every night',
    type: 'backup',
    schedule: '0 2 * * *', // 2 AM every day
    isActive: true,
    lastRun: new Date('2023-11-05T02:00:00Z'),
    nextRun: new Date('2023-11-06T02:00:00Z'),
    lastStatus: 'success',
    parameters: {
      backupType: 'full',
      retentionDays: 7
    },
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-01T00:00:00Z'),
    createdBy: 'user-1'
  },
  // Add more tasks...
];

// Mock Data Retention Policies
export const mockDataRetentionPolicies: DataRetentionPolicy[] = [
  {
    id: 'policy-1',
    name: 'User Activity Logs',
    description: 'Retain user activity logs for 1 year',
    entityType: 'ActivityLog',
    retentionPeriod: 365,
    action: 'delete',
    isActive: true,
    lastRun: new Date('2023-11-01T00:00:00Z'),
    nextRun: new Date('2023-12-01T00:00:00Z'),
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-01T00:00:00Z'),
    createdBy: 'user-1'
  },
  // Add more policies...
];

// Mock User Consents
export const mockUserConsents: UserConsent[] = [
  {
    id: 'consent-1',
    userId: 'user-1',
    consentType: 'privacy-policy',
    granted: true,
    grantedAt: new Date('2023-01-15T09:00:00Z'),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  // Add more consents...
];

// Mock Data for Charts and Stats
export const mockChartData = {
  userGrowth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    data: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600]
  },
  systemHealth: {
    uptime: '99.99%',
    responseTime: '120ms',
    errorRate: '0.5%',
    activeUsers: '1,234',
    requests: '1.2M',
    dataTransferred: '5.4TB'
  }
};
