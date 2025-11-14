import React, { useState } from 'react';
import {
    Card,
    Form,
    Input,
    Button,
    Switch,
    Select,
    Typography,
    Divider,
    Tabs,
    message,
    Space,
    Alert,
    Upload,
    Row,
    Col,
    InputNumber,
    Tooltip,
    Modal, Table
} from 'antd';
import {
  SaveOutlined,
  ReloadOutlined,
  UploadOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  SecurityScanOutlined,
  MailOutlined,
  ApiOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  NotificationOutlined,
  LockOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const SystemSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = (values: any) => {
    setLoading(true);
    console.log('Form values:', values);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Settings saved successfully');
    }, 1000);
  };

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  // Handle file upload
  const handleFileUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Handle reset to defaults
  const handleResetDefaults = () => {
    Modal.confirm({
      title: 'Reset to Default Settings',
      content: 'Are you sure you want to reset all settings to their default values? This action cannot be undone.',
      okText: 'Reset',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        message.success('Settings have been reset to default values');
      },
    });
  };

  return (
    <div className="system-settings">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>System Settings</Title>
          <Text type="secondary">Manage your system configuration and preferences</Text>
        </div>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleResetDefaults}
            danger
          >
            Reset to Defaults
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={loading}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>
        </Space>
      </div>

      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabBarExtraContent={
            <Text type="secondary" style={{ marginRight: 8 }}>
              <InfoCircleOutlined /> Changes are saved automatically
            </Text>
          }
        >
          <TabPane
            tab={
              <span>
                <GlobalOutlined />
                <span>General</span>
              </span>
            }
            key="general"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                siteName: 'Admin Dashboard',
                siteUrl: 'https://admin.example.com',
                timezone: 'UTC',
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                itemsPerPage: 10,
                maintenanceMode: false,
              }}
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Site Name"
                    name="siteName"
                    rules={[{ required: true, message: 'Please input the site name!' }]}
                  >
                    <Input placeholder="My Admin Dashboard" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Site URL"
                    name="siteUrl"
                    rules={[
                      { required: true, message: 'Please input the site URL!' },
                      { type: 'url', message: 'Please enter a valid URL!' },
                    ]}
                  >
                    <Input placeholder="https://admin.example.com" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Timezone"
                    name="timezone"
                    tooltip="Select your timezone to ensure all dates and times are displayed correctly."
                  >
                    <Select showSearch>
                      <Option value="UTC">UTC (Coordinated Universal Time)</Option>
                      <Option value="GMT">GMT (Greenwich Mean Time)</Option>
                      <Option value="EST">EST (Eastern Standard Time)</Option>
                      <Option value="PST">PST (Pacific Standard Time)</Option>
                      <Option value="CET">CET (Central European Time)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Date Format"
                    name="dateFormat"
                  >
                    <Select>
                      <Option value="YYYY-MM-DD">YYYY-MM-DD (2023-11-05)</Option>
                      <Option value="MM/DD/YYYY">MM/DD/YYYY (11/05/2023)</Option>
                      <Option value="DD/MM/YYYY">DD/MM/YYYY (05/11/2023)</Option>
                      <Option value="MMMM D, YYYY">MMMM D, YYYY (November 5, 2023)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Time Format"
                    name="timeFormat"
                  >
                    <Select>
                      <Option value="HH:mm">24-hour (14:30)</Option>
                      <Option value="h:mm A">12-hour (2:30 PM)</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left" style={{ marginTop: 0 }}>Display</Divider>

              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Items Per Page"
                    name="itemsPerPage"
                    tooltip="Number of items to display per page in tables"
                  >
                    <Select>
                      <Option value={10}>10 items</Option>
                      <Option value={25}>25 items</Option>
                      <Option value={50}>50 items</Option>
                      <Option value={100}>100 items</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Default Theme"
                    name="defaultTheme"
                  >
                    <Select>
                      <Option value="light">Light</Option>
                      <Option value="dark">Dark</Option>
                      <Option value="system">System Default</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="maintenanceMode"
                valuePropName="checked"
                label={
                  <span>
                    Maintenance Mode{' '}
                    <Tooltip title="When enabled, only administrators can access the dashboard">
                      <QuestionCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
                    </Tooltip>
                  </span>
                }
              >
                <Switch
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </Form.Item>

              <Form.Item
                label="Maintenance Message"
                name="maintenanceMessage"
                extra="This message will be displayed to users when maintenance mode is active"
              >
                <TextArea
                  rows={3}
                  placeholder="We're currently performing scheduled maintenance. We'll be back shortly!"
                />
              </Form.Item>

              <Divider orientation="left">Logo & Favicon</Divider>

              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Logo"
                    name="logo"
                    extra="Recommended size: 180x50px"
                  >
                    <Upload
                      name="logo"
                      listType="picture"
                      className="logo-upload"
                      showUploadList={false}
                      action="/api/upload"
                      onChange={handleFileUpload}
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Favicon"
                    name="favicon"
                    extra="Recommended size: 32x32px"
                  >
                    <Upload
                      name="favicon"
                      listType="picture"
                      className="favicon-upload"
                      showUploadList={false}
                      action="/api/upload"
                      onChange={handleFileUpload}
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Save Settings
                </Button>
              </div>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <MailOutlined />
                <span>Email</span>
              </span>
            }
            key="email"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                mailDriver: 'smtp',
                mailHost: 'smtp.mailtrap.io',
                mailPort: 2525,
                mailEncryption: 'tls',
                mailFromAddress: 'noreply@example.com',
                mailFromName: 'Admin Panel',
              }}
            >
              <Alert
                message="Email Configuration"
                description="Configure how your application sends emails. These settings are used for all outgoing emails."
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
              />

              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Mail Driver"
                    name="mailDriver"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Option value="smtp">SMTP</Option>
                      <Option value="mailgun">Mailgun</Option>
                      <Option value="ses">Amazon SES</Option>
                      <Option value="sendmail">Sendmail</Option>
                      <Option value="log">Log (for testing)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Mail Host"
                    name="mailHost"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="smtp.mailtrap.io" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Mail Port"
                    name="mailPort"
                    rules={[{ required: true }]}
                  >
                    <InputNumber style={{ width: '100%' }} placeholder="2525" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Mail Username"
                    name="mailUsername"
                  >
                    <Input placeholder="Your username" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Mail Password"
                    name="mailPassword"
                  >
                    <Input.Password placeholder="Your password" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Encryption"
                    name="mailEncryption"
                  >
                    <Select>
                      <Option value="tls">TLS</Option>
                      <Option value="ssl">SSL</Option>
                      <Option value="">None</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Mail From Address"
                    name="mailFromAddress"
                    rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
                  >
                    <Input placeholder="noreply@example.com" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Mail From Name"
                name="mailFromName"
              >
                <Input placeholder="Admin Panel" />
              </Form.Item>

              <Divider>Test Email Configuration</Divider>

              <Form.Item
                label="Send Test Email To"
                name="testEmail"
                rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
                extra="Enter an email address to test your configuration"
              >
                <Input
                  placeholder="test@example.com"
                  addonAfter={
                    <Button type="link" onClick={() => message.info('Test email would be sent here')}>
                      Send Test
                    </Button>
                  }
                />
              </Form.Item>

              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Save Email Settings
                </Button>
              </div>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <LockOutlined />
                <span>Security</span>
              </span>
            }
            key="security"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                enable2FA: true,
                passwordMinLength: 8,
                passwordRequireNumbers: true,
                passwordRequireUppercase: true,
                passwordRequireSpecial: true,
                failedLoginAttempts: 5,
                failedLoginLockoutTime: 15,
                sessionLifetime: 120,
              }}
            >
              <Alert
                message="Security Settings"
                description="Configure security settings to protect your application from unauthorized access."
                type="warning"
                showIcon
                style={{ marginBottom: 24 }}
              />

              <Divider orientation="left">Authentication</Divider>

              <Form.Item
                name="enable2FA"
                valuePropName="checked"
                label="Enable Two-Factor Authentication"
                extra="Require users to set up 2FA for their accounts"
              >
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
              </Form.Item>

              <Form.Item
                name="enableRegistration"
                valuePropName="checked"
                label="Enable User Registration"
                extra="Allow new users to register accounts"
              >
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" defaultChecked />
              </Form.Item>

              <Divider orientation="left">Password Requirements</Divider>

              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Minimum Password Length"
                    name="passwordMinLength"
                  >
                    <InputNumber min={6} max={32} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="passwordRequireNumbers"
                    valuePropName="checked"
                    label="Require Numbers"
                  >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="passwordRequireUppercase"
                    valuePropName="checked"
                    label="Require Uppercase"
                  >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="passwordRequireSpecial"
                    valuePropName="checked"
                    label="Require Special Characters"
                  >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Password Expiration (days)"
                    name="passwordExpiration"
                    extra="0 = never expires"
                  >
                    <InputNumber min={0} max={365} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">Login Security</Divider>

              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Failed Login Attempts"
                    name="failedLoginAttempts"
                    extra="Number of failed attempts before lockout"
                  >
                    <InputNumber min={1} max={20} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Lockout Time (minutes)"
                    name="failedLoginLockoutTime"
                    extra="How long to lock the account after failed attempts"
                  >
                    <InputNumber min={1} max={1440} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Session Lifetime (minutes)"
                    name="sessionLifetime"
                    extra="How long until a user is logged out due to inactivity"
                  >
                    <InputNumber min={1} max={10080} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">IP Restrictions</Divider>

              <Form.Item
                label="Allowed IP Addresses"
                name="allowedIPs"
                extra="One IP per line. Leave empty to allow all IPs."
              >
                <TextArea
                  rows={4}
                  placeholder="192.168.1.1\n10.0.0.0/8"
                />
              </Form.Item>

              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Save Security Settings
                </Button>
              </div>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <ApiOutlined />
                <span>API</span>
              </span>
            }
            key="api"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                enableApi: true,
                apiRateLimit: 60,
                apiRateLimitPerMinute: 60,
              }}
            >
              <Alert
                message="API Configuration"
                description="Configure API access and rate limiting settings"
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
              />

              <Form.Item
                name="enableApi"
                valuePropName="checked"
                label="Enable API Access"
                extra="Allow applications to access your API"
              >
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" defaultChecked />
              </Form.Item>

              <Divider orientation="left">Rate Limiting</Divider>

              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="API Rate Limit"
                    name="apiRateLimit"
                    extra="Maximum number of requests per minute per IP address"
                  >
                    <InputNumber min={1} max={1000} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="API Key Rate Limit"
                    name="apiKeyRateLimit"
                    extra="Maximum number of requests per minute per API key"
                  >
                    <InputNumber min={1} max={10000} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">API Keys</Divider>

              <Card
                title="Generate New API Key"
                style={{ marginBottom: 24 }}
              >
                <Form.Item
                  label="Key Name"
                  name="apiKeyName"
                  rules={[{ required: true, message: 'Please enter a name for this key' }]}
                >
                  <Input placeholder="e.g., Mobile App, Integration, etc." />
                </Form.Item>

                <Form.Item
                  label="Permissions"
                  name="apiKeyPermissions"
                  rules={[{ required: true, message: 'Please select at least one permission' }]}
                >
                  <Select mode="multiple" placeholder="Select permissions">
                    <Option value="read">Read</Option>
                    <Option value="write">Write</Option>
                    <Option value="delete">Delete</Option>
                    <Option value="users:read">Users: Read</Option>
                    <Option value="users:write">Users: Write</Option>
                    <Option value="content:read">Content: Read</Option>
                    <Option value="content:write">Content: Write</Option>
                    <Option value="settings:read">Settings: Read</Option>
                    <Option value="settings:write">Settings: Write</Option>
                  </Select>
                </Form.Item>

                <div style={{ textAlign: 'right' }}>
                  <Button type="primary" icon={<CloudUploadOutlined />}>
                    Generate API Key
                  </Button>
                </div>
              </Card>

              <Table
                columns={[
                  { title: 'Name', dataIndex: 'name', key: 'name' },
                  { title: 'Key', dataIndex: 'key', key: 'key', render: () => '••••••••••••••••••••' },
                  { title: 'Created', dataIndex: 'created', key: 'created' },
                  { title: 'Last Used', dataIndex: 'lastUsed', key: 'lastUsed' },
                  {
                    title: 'Actions',
                    key: 'actions',
                    render: () => (
                      <Space>
                        <Button type="link" size="small">View</Button>
                        <Button type="link" size="small" danger>Revoke</Button>
                      </Space>
                    ),
                  },
                ]}
                dataSource={[
                  {
                    key: '1',
                    name: 'Mobile App',
                    created: '2023-10-15',
                    lastUsed: '2023-11-04 14:30:22'
                  },
                  {
                    key: '2',
                    name: 'Backup Service',
                    created: '2023-09-22',
                    lastUsed: '2023-11-05 08:12:45'
                  },
                ]}
                pagination={false}
              />

              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Save API Settings
                </Button>
              </div>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <DatabaseOutlined />
                <span>Backup</span>
              </span>
            }
            key="backup"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Alert
                message="Backup & Restore"
                description="Create and manage backups of your application data"
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
              />

              <Card
                title="Create New Backup"
                style={{ marginBottom: 24 }}
                extra={
                  <Button
                    type="primary"
                    icon={<CloudUploadOutlined />}
                    onClick={() => message.info('Starting backup process...')}
                  >
                    Create Backup Now
                  </Button>
                }
              >
                <Form.Item
                  label="Backup Options"
                  name="backupOptions"
                  initialValue={['database', 'files']}
                >
                  <Select mode="multiple" placeholder="Select what to include in the backup">
                    <Option value="database">Database</Option>
                    <Option value="files">Uploaded Files</Option>
                    <Option value="logs">Logs</Option>
                    <Option value="themes">Themes</Option>
                    <Option value="plugins">Plugins</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Backup Name"
                  name="backupName"
                  extra="Leave blank to use auto-generated name"
                >
                  <Input placeholder="e.g., backup-2023-11-05" />
                </Form.Item>
              </Card>

              <Card
                title="Scheduled Backups"
                style={{ marginBottom: 24 }}
              >
                <Form.Item
                  name="enableScheduledBackups"
                  valuePropName="checked"
                  label="Enable Scheduled Backups"
                >
                  <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" defaultChecked />
                </Form.Item>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Frequency"
                      name="backupFrequency"
                      initialValue="daily"
                    >
                      <Select>
                        <Option value="hourly">Hourly</Option>
                        <Option value="daily">Daily</Option>
                        <Option value="weekly">Weekly</Option>
                        <Option value="monthly">Monthly</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Backup Retention"
                      name="backupRetention"
                      initialValue={30}
                      extra="Number of backups to keep"
                    >
                      <InputNumber min={1} max={365} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Backup Storage"
                      name="backupStorage"
                      initialValue="local"
                    >
                      <Select>
                        <Option value="local">Local Storage</Option>
                        <Option value="s3">Amazon S3</Option>
                        <Option value="dropbox">Dropbox</Option>
                        <Option value="google-drive">Google Drive</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="Available Backups">
                <Table
                  columns={[
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                    { title: 'Size', dataIndex: 'size', key: 'size' },
                    { title: 'Type', dataIndex: 'type', key: 'type' },
                    {
                      title: 'Actions',
                      key: 'actions',
                      render: () => (
                        <Space>
                          <Button type="link" size="small">Download</Button>
                          <Button type="link" size="small" danger>Delete</Button>
                        </Space>
                      ),
                    },
                  ]}
                  dataSource={[
                    {
                      key: '1',
                      name: 'backup-2023-11-05.zip',
                      date: '2023-11-05 00:00:00',
                      size: '245.6 MB',
                      type: 'Full Backup'
                    },
                    {
                      key: '2',
                      name: 'backup-2023-11-04.zip',
                      date: '2023-11-04 00:00:00',
                      size: '240.1 MB',
                      type: 'Full Backup'
                    },
                    {
                      key: '3',
                      name: 'backup-2023-11-03.zip',
                      date: '2023-11-03 00:00:00',
                      size: '238.9 MB',
                      type: 'Full Backup'
                    },
                  ]}
                  pagination={false}
                />
              </Card>

              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Save Backup Settings
                </Button>
              </div>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <NotificationOutlined />
                <span>Notifications</span>
              </span>
            }
            key="notifications"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                emailNotifications: true,
                emailFrom: 'noreply@example.com',
                emailFromName: 'Admin Panel',
                slackWebhookUrl: '',
                enableSlackNotifications: false,
              }}
            >
              <Alert
                message="Notification Settings"
                description="Configure how and when you receive system notifications"
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
              />

              <Divider orientation="left">Email Notifications</Divider>

              <Form.Item
                name="emailNotifications"
                valuePropName="checked"
                label="Enable Email Notifications"
              >
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" defaultChecked />
              </Form.Item>

              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="From Email Address"
                    name="emailFrom"
                    rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
                  >
                    <Input placeholder="noreply@example.com" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="From Name"
                    name="emailFromName"
                  >
                    <Input placeholder="Admin Panel" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Notification Email Addresses"
                name="notificationEmails"
                extra="Comma-separated list of email addresses to receive system notifications"
              >
                <TextArea
                  rows={3}
                  placeholder="admin@example.com, support@example.com"
                />
              </Form.Item>

              <Divider orientation="left">Slack Notifications</Divider>

              <Form.Item
                name="enableSlackNotifications"
                valuePropName="checked"
                label="Enable Slack Notifications"
              >
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
              </Form.Item>

              <Form.Item
                label="Slack Webhook URL"
                name="slackWebhookUrl"
                extra={
                  <span>
                    Create an incoming webhook in your Slack workspace and paste the URL above.
                    <a href="https://api.slack.com/messaging/webhooks" target="_blank" rel="noopener noreferrer">
                      Learn more
                    </a>
                  </span>
                }
              >
                <Input.Password
                  placeholder="https://hooks.slack.com/services/..."
                  visibilityToggle={false}
                />
              </Form.Item>

              <Form.Item
                label="Slack Channel"
                name="slackChannel"
                extra="Leave blank to use the default channel configured in Slack"
              >
                <Input placeholder="#alerts" />
              </Form.Item>

              <Divider orientation="left">Notification Events</Divider>

              <Card title="System Events" style={{ marginBottom: 16 }}>
                <Form.Item
                  name="notifySystemUpdates"
                  valuePropName="checked"
                  label={
                    <span>
                      System Updates Available
                      <Tooltip title="Get notified when new system updates are available">
                        <QuestionCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.45)', marginLeft: 8 }} />
                      </Tooltip>
                    </span>
                  }
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>

                <Form.Item
                  name="notifyBackupComplete"
                  valuePropName="checked"
                  label="Backup Completed"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>

                <Form.Item
                  name="notifyBackupFailed"
                  valuePropName="checked"
                  label="Backup Failed"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>

                <Form.Item
                  name="notifyDiskSpace"
                  valuePropName="checked"
                  label="Low Disk Space"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>
              </Card>

              <Card title="User Events" style={{ marginBottom: 16 }}>
                <Form.Item
                  name="notifyNewUser"
                  valuePropName="checked"
                  label="New User Registration"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>

                <Form.Item
                  name="notifyFailedLogin"
                  valuePropName="checked"
                  label="Failed Login Attempts"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>

                <Form.Item
                  name="notifyUserLocked"
                  valuePropName="checked"
                  label="User Account Locked"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>
              </Card>

              <Card title="Security Events" style={{ marginBottom: 16 }}>
                <Form.Item
                  name="notifySecurityIssues"
                  valuePropName="checked"
                  label="Security Issues Detected"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>

                <Form.Item
                  name="notifyFileChanges"
                  valuePropName="checked"
                  label="Suspicious File Changes"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>

                <Form.Item
                  name="notifyBruteForce"
                  valuePropName="checked"
                  label="Brute Force Attack Detected"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </Form.Item>
              </Card>

              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Save Notification Settings
                </Button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default SystemSettings;
