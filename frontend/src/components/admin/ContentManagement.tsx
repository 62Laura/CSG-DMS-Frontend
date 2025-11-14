import React, { useState } from 'react';
import styles from './ContentManagement.module.css';
import { 
  Tabs, 
  Table, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Select, 
  Card, 
  Typography, 
  Badge,
  Avatar,
  List,
  Dropdown,
  Menu,
  Tooltip,
  Switch,
  Popconfirm,
  message,
  Row,
  Col
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    MoreOutlined,
    FileTextOutlined,
    CommentOutlined,
    PictureOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    FileExcelOutlined,
    FileZipOutlined, BellOutlined
} from '@ant-design/icons';
import { mockContent, mockAnnouncements } from '@/data/mockAdminData';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const showModal = (content = null) => {
    setEditingContent(content);
    if (content) {
      form.setFieldsValue({
        ...content,
        type: content.type || 'post',
        status: content.status || 'draft',
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Content saved:', values);
      message.success(editingContent ? 'Content updated successfully' : 'Content created successfully');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    message.success(`Content ${status} successfully`);
  };

  const handleDelete = (id: string) => {
    message.success('Content deleted successfully');
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileTextOutlined style={{ color: '#1890ff' }} />;
      case 'page':
        return <FileTextOutlined style={{ color: '#52c41a' }} />;
      case 'media':
        return <PictureOutlined style={{ color: '#722ed1' }} />;
      default:
        return <FileTextOutlined />;
    }
  };

  const getStatusTag = (status: string) => {
    let color = 'default';
    let icon = null;
    
    switch (status) {
      case 'published':
        color = 'success';
        icon = <CheckCircleOutlined />;
        break;
      case 'draft':
        color = 'default';
        break;
      case 'pending':
        color = 'processing';
        break;
      case 'rejected':
        color = 'error';
        icon = <CloseCircleOutlined />;
        break;
      default:
        color = 'default';
    }
    
    return (
      <Tag color={color} icon={icon}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Tag>
    );
  };

  const contentColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <Space>
          {getContentTypeIcon(record.type)}
          <a onClick={() => showModal(record)}>{text || 'Untitled'}</a>
        </Space>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'authorId',
      key: 'author',
      render: (authorId: string) => (
        <Space>
          <Avatar size="small" src={`https://i.pravatar.cc/150?u=${authorId}`} />
          <span>User {authorId.split('-')[1]}</span>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'post' ? 'blue' : type === 'page' ? 'green' : 'purple'}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
      filters: [
        { text: 'Post', value: 'post' },
        { text: 'Page', value: 'page' },
        { text: 'Media', value: 'media' },
      ],
      onFilter: (value: any, record: any) => record.type === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
      filters: [
        { text: 'Published', value: 'published' },
        { text: 'Draft', value: 'draft' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: Date) => new Date(date).toLocaleDateString(),
      sorter: (a: any, b: any) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Preview">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => window.open(`/content/${record.id}`, '_blank')}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this content?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const announcementColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'success' : 'default'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag 
          color={
            priority === 'high' ? 'red' : 
            priority === 'medium' ? 'orange' : 'green'
          }
        >
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => message.info('Edit announcement: ' + record.id)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => message.warning('Delete announcement: ' + record.id)}
          />
        </Space>
      ),
    },
  ];

  const renderContentTab = () => (
    <Card>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="Search content..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Filter by type"
            style={{ width: 150 }}
            allowClear
          >
            <Option value="post">Posts</Option>
            <Option value="page">Pages</Option>
            <Option value="media">Media</Option>
          </Select>
          <Select
            placeholder="Filter by status"
            style={{ width: 150 }}
            allowClear
          >
            <Option value="published">Published</Option>
            <Option value="draft">Draft</Option>
            <Option value="pending">Pending Review</Option>
          </Select>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Add New
          </Button>
        </Space>
      </div>
      
      <Table 
        columns={contentColumns} 
        dataSource={mockContent} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );

  const renderAnnouncementsTab = () => (
    <Card>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Input
            placeholder="Search announcements..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Filter by status"
            style={{ width: 150 }}
            allowClear
          >
            <Option value="active">Active</Option>
            <Option value="upcoming">Upcoming</Option>
            <Option value="expired">Expired</Option>
          </Select>
        </Space>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => message.info('Add new announcement')}
        >
          New Announcement
        </Button>
      </div>
      
      <Table 
        columns={announcementColumns} 
        dataSource={mockAnnouncements} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );

  const renderMediaTab = () => (
    <Card>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <div className={styles.uploadArea}>
          <div><PlusOutlined className={styles.uploadIcon} /></div>
          <div className={styles.uploadText}>Click or drag files to upload</div>
          <Text className={styles.uploadHint}>Supports: JPG, PNG, GIF, PDF, DOC, XLS up to 10MB</Text>
        </div>
        
        <div style={{ textAlign: 'left' }}>
          <Title level={5}>Recent Uploads</Title>
          <List
            grid={{ gutter: 16, column: 6 }}
            dataSource={[
              { name: 'document.pdf', type: 'pdf' },
              { name: 'image.jpg', type: 'image' },
              { name: 'spreadsheet.xlsx', type: 'excel' },
              { name: 'document.docx', type: 'word' },
              { name: 'archive.zip', type: 'zip' },
            ]}
            renderItem={(item: any) => (
              <List.Item>
                <Card 
                  hoverable
                  style={{ textAlign: 'center' }}
                  bodyStyle={{ padding: '12px' }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>
                    {item.type === 'pdf' && <FilePdfOutlined style={{ color: '#ff4d4f' }} />}
                    {item.type === 'image' && <PictureOutlined style={{ color: '#52c41a' }} />}
                    {item.type === 'excel' && <FileExcelOutlined style={{ color: '#52c41a' }} />}
                    {item.type === 'word' && <FileWordOutlined style={{ color: '#1890ff' }} />}
                    {item.type === 'zip' && <FileZipOutlined />}
                  </div>
                  <Text ellipsis style={{ display: 'block' }}>{item.name}</Text>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="content-management">
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        tabBarExtraContent={{
          right: (
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => {
                if (activeTab === 'media') {
                  message.info('Upload new media');
                } else if (activeTab === 'announcements') {
                  message.info('Create new announcement');
                } else {
                  showModal();
                }
              }}
            >
              {activeTab === 'media' ? 'Upload' : 'Create New'}
            </Button>
          ),
        }}
      >
        <TabPane tab="Posts" key="posts">
          {renderContentTab()}
        </TabPane>
        <TabPane tab="Pages" key="pages">
          {renderContentTab()}
        </TabPane>
        <TabPane tab="Media" key="media">
          {renderMediaTab()}
        </TabPane>
        <TabPane 
          tab={
            <span>
              <BellOutlined />
              Announcements
            </span>
          } 
          key="announcements"
        >
          {renderAnnouncementsTab()}
        </TabPane>
      </Tabs>

      {/* Content Editor Modal */}
      <Modal
        title={`${editingContent ? 'Edit' : 'Create New'} Content`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="draft" onClick={handleOk}>
            Save as Draft
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {editingContent ? 'Update' : 'Publish'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: 'post',
            status: 'draft',
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Content Type"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="post">Post</Option>
                  <Option value="page">Page</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="draft">Draft</Option>
                  <Option value="pending">Pending Review</Option>
                  <Option value="published">Published</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter content' }]}
          >
            <TextArea rows={10} placeholder="Enter your content here..." />
          </Form.Item>
          
          <Form.Item
            name="excerpt"
            label="Excerpt"
            tooltip="A short summary of your content"
          >
            <TextArea rows={3} placeholder="Enter a short excerpt (optional)" />
          </Form.Item>
          
          <Form.Item
            name="featuredImage"
            label="Featured Image"
          >
            <div style={{ 
              border: '1px dashed #d9d9d9', 
              borderRadius: 4, 
              padding: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#fafafa'
            }}>
              <PlusOutlined style={{ fontSize: 24, color: '#999', marginBottom: 8 }} />
              <div>Click to upload or drag and drop</div>
              <Text type="secondary">Recommended size: 1200x630px</Text>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentManagement;
