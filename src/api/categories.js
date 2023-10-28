import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
}); 

const getCategories = async () => { 
    const response = await api.get('/api/categories');
    return response.data;
}

const addCategory = async (category) => {
    const response = await api.post('/api/categories/add', category);
    return response.data;
}

const getCategoryById = async (id) => {
    const response = await api.get(`/api/categories/${id}`);
    return response.data;
}

const editCategory = async (id, category) => {
    const response = await api.put(`/api/categories/${id}`, category);
    return response.data;
}

const deleteCategory = async (id) => {
    const response = await api.delete(`/api/categories/${id}`);
    return response.data;
}



export { getCategories, addCategory, getCategoryById, editCategory, deleteCategory };