import { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Spin } from 'antd';
import { getEmployees } from '../services/employeeService';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const totalEmployees = employees.length;

  return (
    <div>
      <Typography.Title level={2}>Dashboard</Typography.Title>
      <Typography.Paragraph>Welcome to the Employee Management System dashboard.</Typography.Paragraph>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Typography.Title level={4}>Total Employees</Typography.Title>
            {loading ? <Spin /> : <Typography.Title level={2}>{totalEmployees}</Typography.Title>}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
