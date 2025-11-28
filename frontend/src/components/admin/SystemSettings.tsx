import React, { useState } from 'react';
import {
    Tabs,
    Card,
    Form,
    Input,
    Switch,
    Button,
    Select,
    InputNumber,
    message,
    Typography,
    Divider,
    Space,
    Alert,
    Collapse,
    Tag,
    Tooltip,
    Row,
    Col,
    Checkbox, Avatar
} from 'antd'; 
import {
    SaveOutlined,
    ReloadOutlined,
    InfoCircleOutlined,
    MailOutlined,
    SecurityScanOutlined,
    GlobalOutlined,
    ApiOutlined,
    CloudServerOutlined,
    NotificationOutlined, DollarOutlined, PlusOutlined, SettingOutlined
} from '@ant-design/icons';
import { mockSystemSettings, mockEmailTemplates, mockIntegrations } from '@/data/mockAdminData';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;

const SystemSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Settings saved:', values);
      message.success('Settings saved successfully');
      setIsLoading(false);
    }, 1000);
  };

  const resetForm = () => {
    form.resetFields();
    message.info('Form reset to default values');
  };

  const renderGeneralSettings = () => (
    <Card title="General Settings">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          appName: mockSystemSettings.find(s => s.key === 'app.name')?.value || '',
          appUrl: mockSystemSettings.find(s => s.key === 'app.url')?.value || '',
          timezone: 'UTC',
          dateFormat: 'YYYY-MM-DD',
          itemsPerPage: 20,
          maintenanceMode: false,
        }}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="appName"
              label="Application Name"
              tooltip="The name of your application"
              rules={[{ required: true, message: 'Please enter application name' }]}
            >
              <Input placeholder="e.g., My Application" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="appUrl"
              label="Application URL"
              tooltip="The base URL of your application"
              rules={[
                { required: true, message: 'Please enter application URL' },
                { type: 'url', message: 'Please enter a valid URL' },
              ]}
            >
              <Input placeholder="e.g., https://example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="timezone"
              label="Default Timezone"
              tooltip="The default timezone for your application"
            >
              <Select showSearch placeholder="Select timezone">
                <Option value="UTC">UTC</Option>
                <Option value="America/New_York">Eastern Time (ET)</Option>
                <Option value="America/Chicago">Central Time (CT)</Option>
                <Option value="America/Denver">Mountain Time (MT)</Option>
                <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="dateFormat"
              label="Date Format"
              tooltip="The default date format for your application"
            >
              <Select>
                <Option value="YYYY-MM-DD">YYYY-MM-DD (2023-11-05)</Option>
                <Option value="MM/DD/YYYY">MM/DD/YYYY (11/05/2023)</Option>
                <Option value="DD/MM/YYYY">DD/MM/YYYY (05/11/2023)</Option>
                <Option value="MMM D, YYYY">MMM D, YYYY (Nov 5, 2023)</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="itemsPerPage"
              label="Items Per Page"
              tooltip="Number of items to show per page in lists"
            >
              <InputNumber min={5} max={100} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="maintenanceMode"
          label="Maintenance Mode"
          tooltip="When enabled, only administrators can access the application"
          valuePropName="checked"
        >
          <Switch 
            checkedChildren="On" 
            unCheckedChildren="Off" 
          />
        </Form.Item>

        <Divider />
        
        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SaveOutlined />} 
              loading={isLoading}
            >
              Save Changes
            </Button>
            <Button 
              onClick={resetForm} 
              icon={<ReloadOutlined />}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );

  const renderEmailSettings = () => (
    <Card title="Email Settings">
      <Alert
        message="Email Configuration"
        description="Configure how your application sends emails to users."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <Form layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Mail Driver"
              tooltip="The email service to use for sending emails"
              initialValue="smtp"
            >
              <Select>
                <Option value="smtp">SMTP</Option>
                <Option value="mailgun">Mailgun</Option>
                <Option value="ses">Amazon SES</Option>
                <Option value="sendmail">Sendmail</Option>
                <Option value="log" disabled>Log (for testing)</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Default From Address"
              initialValue="noreply@example.com"
            >
              <Input placeholder="e.g., noreply@example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Collapse ghost>
          <Panel header="SMTP Configuration" key="smtp-config">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="SMTP Host"
                  initialValue="smtp.mailtrap.io"
                >
                  <Input placeholder="e.g., smtp.mailtrap.io" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Port"
                  initialValue={2525}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Encryption"
                  initialValue="tls"
                >
                  <Select>
                    <Option value="tls">TLS</Option>
                    <Option value="ssl">SSL</Option>
                    <Option value="">None</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Username"
                  initialValue="your_username"
                >
                  <Input placeholder="SMTP username" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  initialValue="your_password"
                >
                  <Input.Password placeholder="SMTP password" />
                </Form.Item>
              </Col>
            </Row>
          </Panel>
        </Collapse>

        <Divider>Email Templates</Divider>
        
        <div style={{ marginBottom: 24 }}>
          <Text>Customize system email templates:</Text>
          <div style={{ marginTop: 8 }}>
            {mockEmailTemplates.map(template => (
              <Tag 
                key={template.id} 
                icon={<MailOutlined />}
                style={{ marginBottom: 8, cursor: 'pointer' }}
                onClick={() => message.info(`Editing template: ${template.name}`)}
              >
                {template.name}
              </Tag>
            ))}
          </div>
        </div>

        <Button type="primary" icon={<SaveOutlined />} loading={isLoading}>
          Save Email Settings
        </Button>
      </Form>
    </Card>
  );

  const renderSecuritySettings = () => (
    <Card title="Security Settings">
      <Alert
        message="Security Configuration"
        description="Configure security settings to protect your application."
        type="warning"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <Form layout="vertical">
        <Form.Item
          label="Enable Two-Factor Authentication (2FA)"
          tooltip="Require users to verify their identity using a second factor"
        >
          <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" defaultChecked />
        </Form.Item>

        <Form.Item
          label="Password Policy"
          tooltip="Configure requirements for user passwords"
        >
          <div style={{ marginBottom: 16 }}>
            <Form.Item name="minPasswordLength" noStyle>
              <InputNumber 
                min={6} 
                max={32} 
                addonBefore="Minimum Length" 
                style={{ width: '100%', marginBottom: 8 }} 
                defaultValue={8}
              />
            </Form.Item>
            <Form.Item name="requireSpecialChars" valuePropName="checked" noStyle>
              <div style={{ margin: '8px 0' }}>
                <Checkbox defaultChecked>Require special characters</Checkbox>
              </div>
            </Form.Item>
            <Form.Item name="requireNumbers" valuePropName="checked" noStyle>
              <div style={{ margin: '8px 0' }}>
                <Checkbox defaultChecked>Require numbers</Checkbox>
              </div>
            </Form.Item>
            <Form.Item name="requireMixedCase" valuePropName="checked" noStyle>
              <div style={{ margin: '8px 0' }}>
                <Checkbox defaultChecked>Require mixed case letters</Checkbox>
              </div>
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          label="Session Management"
          tooltip="Configure user session settings"
        >
          <div style={{ marginBottom: 16 }}>
            <Form.Item label="Session Lifetime (minutes)">
              <InputNumber 
                min={1} 
                max={1440} 
                style={{ width: '100%' }} 
                defaultValue={120}
              />
            </Form.Item>
            <Form.Item>
              <Checkbox defaultChecked>
                Invalidate sessions on password change
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Checkbox defaultChecked>
                Only allow one active session per user
              </Checkbox>
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          label="IP Whitelist"
          tooltip="Restrict admin access to specific IP addresses (one per line)"
        >
          <Input.TextArea 
            rows={4} 
            placeholder="Enter one IP address per line"
            defaultValue={"127.0.0.1\n192.168.1.1"}
          />
        </Form.Item>

        <Divider />
        
        <Space>
          <Button type="primary" icon={<SaveOutlined />} loading={isLoading}>
            Save Security Settings
          </Button>
          <Button>Test Security Settings</Button>
        </Space>
      </Form>
    </Card>
  );

  const renderIntegrations = () => (
    <Card title="Third-Party Integrations">
      <Alert
        message="Integration Hub"
        description="Connect your application with third-party services to extend functionality."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <div className="integrations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {mockIntegrations.map(integration => (
          <Card 
            key={integration.id}
            hoverable
            style={{ marginBottom: 16 }}
            actions={[
              <Switch 
                key="status" 
                checked={integration.isActive}
                checkedChildren="Active" 
                unCheckedChildren="Inactive"
                onChange={(checked) => {
                  message.info(`${integration.name} integration ${checked ? 'activated' : 'deactivated'}`);
                }}
              />,
              <Button 
                key="configure" 
                type="link" 
                onClick={() => message.info(`Configuring ${integration.name}...`)}
              >
                Configure
              </Button>
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar 
                  style={{ 
                    backgroundColor: integration.type === 'email' ? '#1890ff' : 
                                   integration.type === 'storage' ? '#52c41a' :
                                   integration.type === 'auth' ? '#722ed1' :
                                   integration.type === 'payment' ? '#faad14' : '#8c8c8c'
                  }}
                  icon={
                    integration.type === 'email' ? <MailOutlined /> :
                    integration.type === 'storage' ? <CloudServerOutlined /> :
                    integration.type === 'auth' ? <SecurityScanOutlined /> :
                    integration.type === 'payment' ? <DollarOutlined /> : <ApiOutlined />
                  }
                />
              }
              title={
                <Space>
                  {integration.name}
                  <Tag color={integration.isActive ? 'success' : 'default'}>
                    {integration.isActive ? 'Active' : 'Inactive'}
                  </Tag>
                </Space>
              }
              description={
                <div style={{ marginTop: 8 }}>
                  <div>{integration.type.charAt(0).toUpperCase() + integration.type.slice(1)} Integration</div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Last sync: {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}
                  </Text>
                </div>
              }
            />
          </Card>
        ))}
      </div>
      
      <Divider />
      
      <div style={{ textAlign: 'center' }}>
        <Button type="dashed" icon={<PlusOutlined />}>
          Add New Integration
        </Button>
        <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
          Don't see the integration you're looking for? <a href="#">Request it here</a>.
        </Text>
      </div>
    </Card>
  );

  return (
    <div className="system-settings">
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        tabBarExtraContent={
          <Button 
            type="text" 
            icon={<ReloadOutlined />} 
            onClick={() => message.info('Refreshing settings...')}
          >
            Refresh
          </Button>
        }
      >
        <TabPane 
          tab={
            <span>
              <SettingOutlined />
              General
            </span>
          } 
          key="general"
        >
          {renderGeneralSettings()}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <MailOutlined />
              Email
            </span>
          } 
          key="email"
        >
          {renderEmailSettings()}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <SecurityScanOutlined />
              Security
            </span>
          } 
          key="security"
        >
          {renderSecuritySettings()}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <ApiOutlined />
              Integrations
            </span>
          } 
          key="integrations"
        >
          {renderIntegrations()}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
