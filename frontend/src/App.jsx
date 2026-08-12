import { useEffect, useState } from 'react';
import { Layout, Menu, Spin, Typography } from 'antd';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, FileTextOutlined, LogoutOutlined } from '@ant-design/icons';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Report from './pages/Report';
import ProtectedRoute from './components/ProtectedRoute';
import { logout, getUsername, isAuthenticated } from './services/authService';

const { Header, Sider, Content } = Layout;

const items = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/employees', icon: <UserOutlined />, label: 'Employees' },
  { key: '/report', icon: <FileTextOutlined />, label: 'Reports' },
  { key: '/logout', icon: <LogoutOutlined />, label: 'Logout' }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const username = getUsername();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    if (key === '/logout') {
      logout();
      navigate('/login');
      return;
    }
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {location.pathname !== '/login' ? (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" style={{ color: '#fff', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>
            EMS
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuClick} items={items} />
        </Sider>
      ) : null}
      <Layout>
        {location.pathname !== '/login' ? (
          <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Employee Management System
            </Typography.Title>
            <div>Welcome, {username || 'Guest'}</div>
          </Header>
        ) : null}
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
