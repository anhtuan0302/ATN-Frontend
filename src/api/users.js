import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend.tuanngoanh.id.vn',
});

const login = async (email, password) => {
    const response = await api.post('/api/login', { email, password });
    sessionStorage.setItem('userEmail', email);
    return response.data;
};

const register = async (email, password, name) => {
  const response = await api.post('/api/register', { email, password, name });
  return response.data;
};

const getUsers = async () => {
  const response = await api.get('/api/users');
  return response.data;
}

const getUserById = async (id) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

const editUser = async (id, user) => {
  const response = await api.put(`/api/users/${id}`, user);
  return response.data;
}

const deleteUser = async (id) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
}

export { login, register, getUserById, getUsers, deleteUser, editUser };
