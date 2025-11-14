import React from 'react';
import { Card, Row, Col, Statistic, Typography, Progress, Table, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, DatabaseOutlined, BarChartOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Line, Bar } from '@ant-design/charts';
import { mockSystemMetrics, mockApiUsage, mockSupportTickets, mockChartData } from '@/data/mockAdminData';

const { Title, Text } = Typography;

const DashboardHome: React.FC = () => {
  // Process data for charts
  const systemMetricsData = mockSystemMetrics.map(metric => ({
    date: new Date(metric.timestamp).toLocaleTimeString(),
    cpu: metric.cpuUsage,
    memory: metric.memoryUsage,
    users: metric.activeUsers,
  }));

  const apiUsageData = mockApiUsage.map(api => ({
    endpoint: api.endpoint,
    count: api.count,
    responseTime: api.averageResponseTime,
  }));

  const recentTickets = [...mockSupportTickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Chart configurations
  const cpuConfig = {
    data: systemMetricsData,
    xField: 'date',
    yField: 'cpu',
    point: { size: 4, shape: 'diamond' },
    label: {},
    color: '#1890ff',
    smooth: true,
    height: 200,
  };

  const memoryConfig = {
    data: systemMetricsData,
    xField: 'date',
    yField: 'memory',
    color: '#52c41a',
    height: 200,
  };

  const apiUsageConfig = {
    data: apiUsageData,
    xField: 'endpoint',
    yField: 'count',
    seriesField: 'endpoint',
    height: 300,
    legend: { position: 'top-left' },
  };

  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <Text copyable>{text.slice(0, 8)}...</Text>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        if (status === 'open') color = 'blue';
        if (status === 'in-progress') color = 'orange';
        if (status === 'resolved') color = 'green';
        if (status === 'closed') color = 'gray';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        let color = 'default';
        if (priority === 'high') color = 'red';
        if (priority === 'medium') color = 'orange';
        if (priority === 'low') color = 'green';
        return <Tag color={color}>{priority.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="admin-dashboard">
      <Title level={2} style={{ marginBottom: 24 }}>Dashboard Overview</Title>
      
      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={mockChartData.userGrowth.data[mockChartData.userGrowth.data.length - 1]}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix={
                <Text type="success">
                  <ArrowUpOutlined /> 12%
                </Text>
              }
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                <ClockCircleOutlined /> Updated {new Date().toLocaleTimeString()}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="System Uptime"
              value={mockChartData.systemHealth.uptime}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div style={{ marginTop: 8 }}>
              <Progress percent={99.9} status="active" showInfo={false} size="small" />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Sessions"
              value={mockSystemMetrics[0]?.activeUsers || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type={mockSystemMetrics[0]?.activeUsers > 100 ? 'danger' : 'success'}>
                {mockSystemMetrics[0]?.activeUsers > 100 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )}{' '}
                {Math.abs(mockSystemMetrics[0]?.activeUsers - 100)}% from yesterday
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="API Response Time"
              value={mockChartData.systemHealth.responseTime}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type={parseInt(mockChartData.systemHealth.responseTime) > 200 ? 'danger' : 'success'}>
                {parseInt(mockChartData.systemHealth.responseTime) > 200 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )}{' '}
                {parseInt(mockChartData.systemHealth.responseTime) > 200 ? 'High' : 'Optimal'} latency
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="CPU Usage" bordered={false}>
            <Line {...cpuConfig} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Memory Usage" bordered={false}>
            <Bar {...memoryConfig} />
          </Card>
        </Col>
      </Row>

      {/* API Usage and Recent Tickets */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="API Usage" bordered={false}>
            <Bar {...apiUsageConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title="Recent Support Tickets" 
            bordered={false}
            extra={<a href="/admin/support">View All</a>}
          >
            <Table 
              columns={columns} 
              dataSource={recentTickets} 
              size="small"
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
