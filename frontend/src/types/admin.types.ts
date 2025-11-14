// User Management
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'pending';
  lastLogin: Date;
  createdAt: Date;
  permissions: string[];
}

export interface ActivityLog {
    user: string;
    name: string;
    email: string;
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

// System Monitoring
export interface SystemMetric {
  timestamp: Date;
  cpuUsage: number;
  memoryUsage: number;
  activeUsers: number;
  requestCount: number;
  errorRate: number;
}

export interface ApiUsage {
  endpoint: string;
  method: string;
  count: number;
  lastUsed: Date;
  averageResponseTime: number;
  errorRate: number;
}

// Content Management
export interface Content {
  id: string;
  type: 'post' | 'comment' | 'media';
  title?: string;
  content: string;
  authorId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  createdBy: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  targetUsers: 'all' | 'percentage' | 'specific';
  targetUserIds?: string[];
  targetPercentage?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Data Management
export interface DatabaseBackup {
  id: string;
  name: string;
  size: string;
  createdAt: Date;
  createdBy: string;
  status: 'completed' | 'failed' | 'in-progress';
}

// System Configuration
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  lastUpdated: Date;
  updatedBy: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json';
  description: string;
  isPublic: boolean;
  updatedAt: Date;
  updatedBy: string;
}

export interface ThirdPartyIntegration {
  id: string;
  name: string;
  type: 'email' | 'storage' | 'auth' | 'payment' | 'analytics' | 'other';
  isActive: boolean;
  config: Record<string, any>;
  lastSync?: Date;
  syncStatus?: 'success' | 'failed' | 'in-progress';
  createdAt: Date;
  updatedAt: Date;
}

// Reporting
export interface Report {
  id: string;
  name: string;
  type: 'custom' | 'system';
  parameters: Record<string, any>;
  schedule?: string; // cron expression
  lastRun?: Date;
  nextRun?: Date;
  format: 'pdf' | 'csv' | 'excel' | 'json';
  recipients: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Support
export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'bug' | 'feature-request' | 'question' | 'other';
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
  closedBy?: string;
}

// Automation
export interface ScheduledTask {
  id: string;
  name: string;
  description: string;
  type: 'database-cleanup' | 'backup' | 'report' | 'custom';
  schedule: string; // cron expression
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
  lastStatus?: 'success' | 'failed' | 'running';
  lastError?: string;
  parameters: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Compliance
export interface DataRetentionPolicy {
  id: string;
  name: string;
  description: string;
  entityType: string;
  retentionPeriod: number; // in days
  action: 'anonymize' | 'delete';
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface UserConsent {
  id: string;
  userId: string;
  consentType: 'privacy-policy' | 'terms-of-service' | 'marketing' | 'cookies';
  granted: boolean;
  grantedAt: Date;
  revokedAt?: Date;
  ipAddress: string;
  userAgent: string;
}
