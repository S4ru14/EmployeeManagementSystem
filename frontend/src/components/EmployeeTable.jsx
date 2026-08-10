import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const EmployeeTable = ({ employees, onEdit, onDelete, loading }) => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Employee Code', dataIndex: 'employeeCode', key: 'employeeCode' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
    { title: 'Salary', dataIndex: 'salary', key: 'salary', render: (value) => `₱ ${value.toFixed(2)}` },
    { title: 'Date Hired', dataIndex: 'dateHired', key: 'dateHired' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(record)} />
        </Space>
      )
    }
  ];

  return <Table rowKey="id" columns={columns} dataSource={employees} loading={loading} />;
};

export default EmployeeTable;
