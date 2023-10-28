import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../components/user/pages/home';
import Contact from '../components/user/pages/contact';
import Login from '../components/login';
import Register from '../components/register';
import CategoriesList from '../components/user/categories/list';
import DetailCategory from '../components/user/categories/detail';
import ProductsList from '../components/user/products/list';
import DetailProduct from '../components/user/products/detail';
import Cart from '../components/user/pages/cart';
import MyAccount from '../components/user/pages/myAccount';
import DetailOrder from '../components/user/orders/detail';

function IndexRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/categories/:id" element={<DetailCategory />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<DetailProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-account/orders/:id" element={<DetailOrder />} />
        </Routes>
    );
}

export default IndexRoutes;