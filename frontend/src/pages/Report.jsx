import { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Typography, Button, message, Statistic } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { getEmployees } from '../services/employeeService';

const Report = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      try {
        const response = await getEmployees();
        const data = response.data;
        setEmployees(data);

        const summaryData = data.reduce((acc, employee) => {
          const department = employee.department || 'Other';
          acc[department] = (acc[department] || 0) + 1;
          return acc;
        }, {});
        setSummary(summaryData);
      } catch (error) {
        message.error('Failed to load report data.');
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const dataSource = Object.entries(summary).map(([department, count]) => ({ department, count }));

  const columns = [
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Count', dataIndex: 'count', key: 'count' }
  ];

  return (
    <div>
      <Typography.Title level={2}>Employee Report</Typography.Title>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Employees" value={employees.length} loading={loading} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Typography.Title level={4}>Departments</Typography.Title>
            {dataSource.map((item) => (
              <div key={item.department} style={{ marginBottom: 8 }}>
                <Typography.Text strong>{item.department}:</Typography.Text> {item.count}
              </div>
            ))}
          </Card>
        </Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
            Print Report
          </Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        dataSource={employees.map((employee) => ({
          ...employee,
          key: employee.id,
          dateHired: employee.dateHired ? new Date(employee.dateHired).toLocaleDateString() : ''
        }))}
        loading={loading}
        columns={[
          { title: 'Employee Code', dataIndex: 'employeeCode', key: 'employeeCode' },
          { title: 'Name', dataIndex: 'name', key: 'name', render: (_, record) => `${record.firstName} ${record.lastName}` },
          { title: 'Department', dataIndex: 'department', key: 'department' },
          { title: 'Position', dataIndex: 'position', key: 'position' },
          { title: 'Salary', dataIndex: 'salary', key: 'salary', render: (value) => `₱ ${value.toFixed(2)}` },
          { title: 'Date Hired', dataIndex: 'dateHired', key: 'dateHired' }
        ]}
      />
    </div>
  );
};

export default Report;
