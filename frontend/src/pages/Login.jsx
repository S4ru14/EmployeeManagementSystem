import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Card, Typography, message } from 'antd';
import { saveAuth } from '../services/authService';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post('/Auth/login', values);
      saveAuth(response.data);
      message.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      const messageText = error.response?.data?.message || 'Login failed. Please check your credentials.';
      message.error(messageText);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 16 }}>
      <Card style={{ width: 420 }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Employee Management System
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: 'center', marginBottom: 24 }}>
          Please login to continue.
        </Typography.Paragraph>
        <Form layout="vertical" name="login" onFinish={onFinish}>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter your username.' }]}> 
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password.' }]}> 
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
