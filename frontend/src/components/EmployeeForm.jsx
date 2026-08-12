import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, message } from 'antd';
import dayjs from 'dayjs';

const EmployeeForm = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const transformedInitialValues = initialValues
    ? {
        ...initialValues,
        dateHired: initialValues.dateHired ? dayjs(initialValues.dateHired) : null
      }
    : undefined;

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(transformedInitialValues || {});
    }
  }, [visible, transformedInitialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        dateHired: values.dateHired ? values.dateHired.toISOString() : null
      });
      form.resetFields();
    } catch (errorInfo) {
      message.error('Please check the employee information.');
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit Employee' : 'Add Employee'}
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Save"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={transformedInitialValues}
        key={initialValues?.id || 'new'}
      >
        <Form.Item name="employeeCode" label="Employee Code" rules={[{ required: true, message: 'Employee Code is required.' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'First Name is required.' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Last Name is required.' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Email is required.' }, { type: 'email', message: 'Enter a valid email.' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="department" label="Department" rules={[{ required: true, message: 'Department is required.' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="position" label="Position" rules={[{ required: true, message: 'Position is required.' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="salary" label="Salary" rules={[{ required: true, message: 'Salary is required.' }]}> 
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item name="dateHired" label="Date Hired"> 
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;
