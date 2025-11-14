import React, { useState, useMemo } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Typography, 
  Modal, 
  Form, 
  Select, 
  Popconfirm, 
  message, 
  Badge,
  Avatar,
  Card,
  Row,
  Col,
  Tabs,
  Statistic,
  Tooltip,
  Spin,
  Divider,
  InputNumber,
  Switch,
  Dropdown,
  Menu
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  FilterOutlined,
  UserAddOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
  LockOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  StopOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  MoreOutlined,
  DownOutlined
} from '@ant-design/icons';
import { mockUsers } from '@/data/mockAdminData';
import type { User as AdminUser } from '@/types/admin.types';

type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';
type UserRole = 'admin' | 'moderator' | 'user';

// Extend the User type to include superadmin role for this component
interface User extends Omit<AdminUser, 'role' | 'status'> {
  role: UserRole | 'superadmin';
  status?: UserStatus;
}

interface UserFormValues {
  fullName: string;
  email: string;
  role: UserRole | 'superadmin';
  status: UserStatus;
  password?: string;
  confirmPassword?: string;
}

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { confirm } = Modal;

// Status tag component
const UserStatusTag: React.FC<{ status?: UserStatus }> = ({ status = 'inactive' }) => {
  const statusConfig = {
    active: { 
      color: 'success', 
      icon: <CheckCircleOutlined />,
      text: 'Active'
    },
    inactive: { 
      color: 'default', 
      icon: <ClockCircleOutlined />,
      text: 'Inactive'
    },
    suspended: { 
      color: 'error', 
      icon: <StopOutlined />,
      text: 'Suspended'
    },
    pending: { 
      color: 'processing', 
      icon: <SyncOutlined spin />,
      text: 'Pending'
    }
  } as const;

  const config = status in statusConfig 
    ? statusConfig[status as keyof typeof statusConfig] 
    : { color: 'default', icon: null, text: 'Unknown' };

  return (
    <Tag icon={config.icon} color={config.color as any}>
      {config.text}
    </Tag>
  );
};

// Role tag component
const RoleTag: React.FC<{ role: UserRole }> = ({ role }) => {
  const roleConfig = {
    superadmin: { color: 'red', text: 'Super Admin' },
    admin: { color: 'volcano', text: 'Admin' },
    moderator: { color: 'green', text: 'Moderator' },
    user: { color: 'default', text: 'User' }
  } as const;
  
  const config = role in roleConfig 
    ? roleConfig[role as keyof typeof roleConfig] 
    : { color: 'default', text: role };
  
  return <Tag color={config.color as any}>{config.text}</Tag>;
};

const UserManagement: React.FC = () => {
  // State management
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<UserStatus | 'all'>('all');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm<UserFormValues>();
  
  // Helper function to safely handle user status
  const getUserStatus = (user: User): UserStatus => {
    return user.status || 'active';
  };
  
  // Filter users based on search text and active tab
  const filteredUsers = useMemo(() => {
    const searchLower = searchText.toLowerCase();
    return mockUsers.filter(user => {
      const userStatus = getUserStatus(user);
      const matchesSearch = 
        (user.fullName?.toLowerCase().includes(searchLower)) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) ||
        userStatus.toLowerCase().includes(searchLower);
      
      const matchesTab = activeTab === 'all' || userStatus === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [searchText, activeTab]);

  // Columns for the users table
  const columns = [
    {
      title: 'User',
      dataIndex: 'fullName',
      key: 'name',
      render: (_: any, record: User) => (
        <Space align="center">
          <Tooltip title={`Role: ${record.role}`}>
            <Avatar 
              style={{ 
                backgroundColor: '#1890ff',
                verticalAlign: 'middle'
              }}
              icon={<UserOutlined />}
            >
              {record.fullName?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          </Tooltip>
          <div>
            <div style={{ fontWeight: 500 }}>{record.fullName || 'Unnamed User'}</div>
            <Text type="secondary">{record.email}</Text>
          </div>
        </Space>
      ),
      sorter: (a: User, b: User) => (a.fullName || '').localeCompare(b.fullName || ''),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => <RoleTag role={role} />,
      filters: [
        { text: 'Super Admin', value: 'superadmin' },
        { text: 'Admin', value: 'admin' },
        { text: 'Moderator', value: 'moderator' },
        { text: 'User', value: 'user' },
      ],
      onFilter: (value: any, record: User) => record.role === value,
      sorter: (a: User, b: User) => a.role.localeCompare(b.role),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: UserStatus | undefined) => <UserStatusTag status={status || 'inactive'} />,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Suspended', value: 'suspended' },
        { text: 'Pending', value: 'pending' },
      ],
      onFilter: (value: any, record: User) => record.status === value,
    },
    {
      title: 'Last Active',
      dataIndex: 'lastLogin',
      key: 'lastActive',
      render: (date: Date | string) => {
        if (!date) return <Text type="secondary">Never</Text>;
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return (
          <Tooltip title={dateObj.toLocaleString()}>
            {dateObj.toLocaleDateString()}
          </Tooltip>
        );
      },
      sorter: (a: User, b: User) => {
        const aTime = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
        const bTime = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
        return aTime - bTime;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: User) => (
        <Space size="middle">
          <Tooltip title="Edit User">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          
          {record.status === 'active' ? (
            <Tooltip title="Suspend User">
              <Button 
                type="text" 
                danger 
                icon={<StopOutlined />} 
                onClick={() => handleSuspend(record)}
                loading={isLoading && editingUser?.id === record.id}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Activate User">
              <Button 
                type="text" 
                icon={<CheckOutlined />} 
                onClick={() => handleActivate(record)}
                loading={isLoading && editingUser?.id === record.id}
              />
            </Tooltip>
          )}
          
          <Dropdown 
            overlay={
              <Menu>
                <Menu.Item 
                  key="delete" 
                  danger 
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.id)}
                  disabled={record.role === 'admin' || record.role === 'superadmin'}
                >
                  Delete User
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            disabled={record.role === 'superadmin'}
          >
            <Tooltip title={record.role === 'superadmin' ? 'Superadmin actions are restricted' : 'More actions'}>
              <Button type="text" icon={<MoreOutlined />} />
            </Tooltip>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Handle edit user
  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      fullName: user.fullName || '',
      email: user.email,
      role: user.role,
      status: getUserStatus(user),
    });
    setIsModalVisible(true);
  };
  
  // Handle form submission
  const handleSubmit = async (values: UserFormValues) => {
    setIsLoading(true);
    try {
      // In a real app, you would make an API call here
      console.log('Form values:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(`User ${editingUser ? 'updated' : 'created'} successfully`);
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      message.error('Failed to save user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle delete user
  const handleDelete = (userId: string) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone and will permanently delete the user account.',
      okText: 'Yes, delete',
      okType: 'danger',
      cancelText: 'No, keep user',
      async onOk() {
        try {
          setIsLoading(true);
          // In a real app, you would make an API call here
          console.log('Deleting user:', userId);
          await new Promise(resolve => setTimeout(resolve, 800));
          message.success('User deleted successfully');
        } catch (error) {
          console.error('Error deleting user:', error);
          message.error('Failed to delete user. Please try again.');
        } finally {
          setIsLoading(false);
        }
      },
    });
  };
  
  // Handle suspend user
  const handleSuspend = (user: User) => {
    confirm({
      title: `Suspend ${user.fullName || 'this user'}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'The user will not be able to access the system until reactivated.',
      okText: 'Yes, suspend',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          setIsLoading(true);
          // In a real app, you would make an API call here
          console.log('Suspending user:', user.id);
          await new Promise(resolve => setTimeout(resolve, 800));
          message.success(`${user.fullName || 'User'} has been suspended`);
        } catch (error) {
          console.error('Error suspending user:', error);
          message.error('Failed to suspend user. Please try again.');
        } finally {
          setIsLoading(false);
        }
      },
    });
  };
  
  // Handle activate user
  const handleActivate = async (user: User) => {
    try {
      setIsLoading(true);
      // In a real app, you would make an API call here
      console.log('Activating user:', user.id);
      await new Promise(resolve => setTimeout(resolve, 800));
      message.success(`${user.fullName || 'User'} has been activated`);
    } catch (error) {
      console.error('Error activating user:', error);
      message.error('Failed to activate user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle invite user
  const handleInviteUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  return (
    <div className="user-management">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, alignItems: 'center' }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>User Management</Title>
          <Text type="secondary">Manage all system users and their permissions</Text>
        </div>
        <Button 
          type="primary" 
          icon={<UserAddOutlined />}
          onClick={handleInviteUser}
        >
          Add User
        </Button>
      </div>
      
      <Card 
        className="user-management-card" 
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Input
                placeholder="Search users..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col flex="auto" style={{ textAlign: 'right' }}>
              <Text type="secondary" style={{ marginRight: 16 }}>
                {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
              </Text>
            </Col>
          </Row>
        </div>
        
        <Tabs 
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as UserStatus | 'all')}
          style={{ padding: '0 16px' }}
          tabBarExtraContent={{
            left: (
              <div style={{ display: 'flex', gap: 16, marginRight: 16 }}>
                <Statistic 
                  title="Total Users" 
                  value={mockUsers.length} 
                  valueStyle={{ fontSize: 16 }} 
                  prefix={<TeamOutlined />} 
                />
                <Divider type="vertical" />
                <Statistic 
                  title="Active" 
                  value={mockUsers.filter(u => u.status === 'active').length} 
                  valueStyle={{ fontSize: 16, color: '#52c41a' }} 
                />
              </div>
            )
          }}
        >
          <TabPane tab="All Users" key="all" />
          <TabPane tab="Active" key="active" />
          <TabPane tab="Inactive" key="inactive" />
          <TabPane tab="Suspended" key="suspended" />
          <TabPane tab="Pending" key="pending" />
        </Tabs>
        
        <div style={{ padding: '0 16px 16px' }}>
          <Table 
            columns={columns} 
            dataSource={filteredUsers} 
            rowKey="id"
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
              size: 'small'
            }}
            loading={isLoading}
            scroll={{ x: true }}
            locale={{
              emptyText: (
                <div style={{ padding: '40px 0' }}>
                  <UserOutlined style={{ fontSize: 48, color: '#bfbfbf', marginBottom: 16 }} />
                  <div>No users found</div>
                  <Text type="secondary">
                    {searchText ? 'Try a different search term' : 'No users match the current filters'}
                  </Text>
                </div>
              )
            }}
          />
        </div>
      </Card>
      
      <Modal
        title={
          <>
            {editingUser ? (
              <>
                <EditOutlined style={{ marginRight: 8 }} />
                Edit User
              </>
            ) : (
              <>
                <UserAddOutlined style={{ marginRight: 8 }} />
                Add New User
              </>
            )}
          </>
        }
        open={isModalVisible}
        onCancel={() => !isLoading && setIsModalVisible(false)}
        footer={null}
        width={600}
        destroyOnClose
        maskClosable={!isLoading}
        keyboard={!isLoading}
      >
        <Spin spinning={isLoading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark="optional"
            initialValues={{
              status: 'active',
              role: 'user'
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[{ required: true, message: 'Please input the full name!' }]}
                >
                  <Input placeholder="John Doe" disabled={isLoading} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input the email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input 
                    placeholder="john@example.com" 
                    disabled={isLoading || !!editingUser}
                    suffix={editingUser && <Tooltip title="Email cannot be changed"><LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} /></Tooltip>}
                  />
                </Form.Item>
              </Col>
            </Row>
            
            {!editingUser && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: 'Please input the password!' },
                      { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                  >
                    <Input.Password 
                      placeholder="••••••••" 
                      disabled={isLoading}
                      iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm the password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password 
                      placeholder="••••••••" 
                      disabled={isLoading}
                      iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: 'Please select a role!' }]}
                >
                  <Select 
                    placeholder="Select a role"
                    disabled={isLoading}
                    optionLabelProp="label"
                  >
                    <Option value="admin" label="Admin">
                      <RoleTag role="admin" />
                    </Option>
                    <Option value="moderator" label="Moderator">
                      <RoleTag role="moderator" />
                    </Option>
                    <Option value="user" label="User">
                      <RoleTag role="user" />
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[{ required: true, message: 'Please select a status!' }]}
                >
                  <Select 
                    placeholder="Select a status"
                    disabled={isLoading || editingUser?.role === 'superadmin'}
                    optionLabelProp="label"
                    value={form.getFieldValue('status')}
                  >
                    <Option value="active" label="Active">
                      <UserStatusTag status="active" />
                    </Option>
                    <Option value="inactive" label="Inactive">
                      <UserStatusTag status="inactive" />
                    </Option>
                    <Option value="suspended" label="Suspended">
                      <UserStatusTag status="suspended" />
                    </Option>
                    <Option value="pending" label="Pending">
                      <UserStatusTag status="pending" />
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item style={{ marginTop: 32, textAlign: 'right' }}>
              <Button 
                onClick={() => !isLoading && setIsModalVisible(false)} 
                style={{ marginRight: 8 }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={isLoading}
                icon={editingUser ? <CheckOutlined /> : <UserAddOutlined />}
              >
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default UserManagement;
