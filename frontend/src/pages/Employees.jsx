import { useEffect, useState } from 'react';
import { Button, Card, Popconfirm, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      message.error('Failed to load employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAdd = () => {
    setSelectedEmployee(null);
    setModalVisible(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const handleDelete = async (employee) => {
    try {
      await deleteEmployee(employee.id);
      message.success('Employee deleted successfully.');
      loadEmployees();
    } catch (error) {
      const messageText = error.response?.data?.message || 'Failed to delete employee.';
      message.error(messageText);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, { ...selectedEmployee, ...values });
        message.success('Employee updated successfully.');
      } else {
        await createEmployee(values);
        message.success('Employee created successfully.');
      }
      setModalVisible(false);
      loadEmployees();
    } catch (error) {
      const status = error.response?.status;
      const messageText = error.response?.data?.message || 'Failed to save employee.';
      if (status === 409) {
        message.error(messageText);
      } else if (status === 400) {
        message.error('Please check the employee information.');
      } else {
        message.error(messageText);
      }
    }
  };

  return (
    <div>
      <Typography.Title level={2}>Employees</Typography.Title>
      <Card style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Employee
        </Button>
      </Card>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={(record) => handleDelete(record)} loading={loading} />
      <EmployeeForm
        visible={modalVisible}
        initialValues={selectedEmployee}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Employees;
