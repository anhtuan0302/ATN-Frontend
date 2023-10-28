import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
}); 

const getProducts = async () => { 
    const response = await api.get('/api/products');
    return response.data;
}

const getProductById = async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
}

const addProduct = async (product) => {
    const response = await api.post('/api/products/add', product);
    return response.data;
}

const editProduct = async (id, product) => {
    const response = await api.put(`/api/products/${id}`, product);
    return response.data;
}

const deleteProduct = async (id) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
}

export { getProducts, getProductById, addProduct, editProduct, deleteProduct};