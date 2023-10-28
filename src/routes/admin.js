import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from '../components/admin/pages/dashboard';
import OrdersList from '../components/admin/orders/list';
import DetailOrder from '../components/admin/orders/detail';
import ProductsList from '../components/admin/products/list';
import AddProduct from '../components/admin/products/add';
import EditProduct from '../components/admin/products/edit';
import DetailProduct from '../components/admin/products/detail';
import CategoriesList from '../components/admin/categories/list';
import AddCategory from '../components/admin/categories/add';
import EditCategory from '../components/admin/categories/edit';
import UsersList from '../components/admin/users/list';
import EditUser from '../components/admin/users/edit';

function AdminRoutes() {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail === 'admin@atn.com') {
        return (
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/:id" element={<DetailOrder />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/products/:id" element={<DetailProduct />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/categories/add" element={<AddCategory />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
          </Routes>
        );
      } else {
        return <Navigate to="/" />;
      }
}

export default AdminRoutes;