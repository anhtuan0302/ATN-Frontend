import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend.tuanngoanh.id.vn',
}); 

const getOrders = async () => {
    const response = await api.get('/api/orders');
    return response.data;
}

const addOrder = async (order) => {
    const response = await api.post('/api/orders/add', order);
    return response.data;
}

const getOrderById = async (id) => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
}

const editOrder = async (id, order) => {
    const response = await api.put(`/api/orders/${id}`, order);
    return response.data;
}

const deleteOrder = async (id) => {
    const response = await api.delete(`/api/orders/${id}`);
    return response.data;
}

const getUserOrders = async (email) => {
    const response = await api.get(`/api/orders/user/${email}`);
    return response.data;
}

export { getOrders, addOrder, getOrderById, editOrder, deleteOrder, getUserOrders};