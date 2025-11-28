import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Space, 
  Modal, 
  Form, 
  Select, 
  Tag, 
  Badge, 
  Popconfirm, 
  message, 
  Typography,
  Avatar,
  Card,
  Row,
  Col
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  FilterOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { mockUsers } from '@/data/mockAdminData';

const { Title } = Typography;
const { Option } = Select;

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const showModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue({
        ...user,
        role: user.role,
        status: user.status,
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        // Update existing user
        setUsers(users.map(u => 
          u.id === editingUser.id ? { ...u, ...values } : u
        ));
        message.success('User updated successfully');
      } else {
        // Add new user
        const newUser = {
          ...values,
          id: `user-${Date.now()}`,
          createdAt: new Date(),
          lastLogin: null,
        };
        setUsers([...users, newUser]);
        message.success('User added successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    message.success('User deleted successfully');
  };

  const handleStatusChange = (userId: string, status: 'active' | 'suspended' | 'pending') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
    message.success(`User ${status} successfully`);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'fullName',
      key: 'user',
      render: (text: string, record: any) => (
        <Space>
          <Avatar 
            icon={<UserOutlined />} 
            src={record.avatar} 
            style={{ backgroundColor: record.role === 'admin' ? '#f56a00' : '#1890ff' }}
          />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag 
          color={
            role === 'admin' ? 'red' : 
            role === 'moderator' ? 'blue' : 'default'
          }
        >
          {role.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Moderator', value: 'moderator' },
        { text: 'User', value: 'user' },
      ],
      onFilter: (value: any, record: any) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={
            status === 'active' ? 'success' : 
            status === 'suspended' ? 'error' : 'default'
          } 
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Suspended', value: 'suspended' },
        { text: 'Pending', value: 'pending' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date: Date) => date ? new Date(date).toLocaleString() : 'Never',
      sorter: (a: any, b: any) => 
        new Date(a.lastLogin || 0).getTime() - new Date(b.lastLogin || 0).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
            title="Edit"
          />
          {record.status === 'active' ? (
            <Button 
              type="text" 
              danger 
              icon={<CloseCircleOutlined />} 
              onClick={() => handleStatusChange(record.id, 'suspended')}
              title="Suspend"
            />
          ) : (
            <Button 
              type="text" 
              icon={<CheckCircleOutlined />} 
              onClick={() => handleStatusChange(record.id, 'active')}
              title="Activate"
            />
          )}
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              title="Delete"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="user-management">
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>User Management</Title>
          <Space>
            <Input
              placeholder="Search users..."
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => showModal()}
            >
              Add User
            </Button>
          </Space>
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredUsers} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </Card>

      {/* User Form Modal */}
      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            role: 'user',
            status: 'active',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select placeholder="Select role">
                  <Option value="admin">Admin</Option>
                  <Option value="moderator">Moderator</Option>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="active">Active</Option>
                  <Option value="suspended">Suspended</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {!editingUser && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: 'Please enter password' },
                    { min: 6, message: 'Password must be at least 6 characters' },
                  ]}
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm password" />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
