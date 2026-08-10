import api from './api';

export const getEmployees = () => api.get('/Employees');
export const getEmployee = (id) => api.get(`/Employees/${id}`);
export const createEmployee = (employee) => api.post('/Employees', employee);
export const updateEmployee = (id, employee) => api.put(`/Employees/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`/Employees/${id}`);
