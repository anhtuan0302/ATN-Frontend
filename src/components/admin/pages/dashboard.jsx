import React, { useState, useEffect } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getCategories } from "../../../api/categories";
import { getProducts } from "../../../api/products";
import { getOrders } from "../../../api/orders";
import { getUsers } from "../../../api/users";

const Dashboard = () => {
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const categories = await getCategories();
            const products = await getProducts();
            const orders = await getOrders();
            const users = await getUsers();

            setTotalCategories(categories.length);
            setTotalProducts(products.length);
            setTotalOrders(orders.length);
            setTotalUsers(users.length);
        };

        fetchData();
    }, []);

    const pageTitle = "Dashboard";
    const pageContent = (
        <div className="container">
            <div className="row pt-5">
                <div className="col-md-6 text-center">
                    <a href="/admin/orders" style={{ textDecoration: "none" }}>
                        <div className="card bg-primary text-white mb-3">
                            <div className="card-header">Total Orders</div>
                            <div className="card-body">
                                <h4 className="card-title">{totalOrders}</h4>
                                <p className="card-text">View Orders</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-md-6 text-center">
                    <a href="/admin/products" style={{ textDecoration: "none" }}>
                        <div className="card bg-success text-white mb-3">
                            <div className="card-header">Total Products</div>
                            <div className="card-body">
                                <h4 className="card-title">{totalProducts}</h4>
                                <p className="card-text">View Products</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="row pt-4">
                <div className="col-md-6 text-center">
                    <a href="/admin/categories" style={{ textDecoration: "none" }}>
                        <div className="card bg-warning text-white mb-3">
                            <div className="card-header">Total Categories</div>
                            <div className="card-body">
                                <h4 className="card-title">{totalCategories}</h4>
                                <p className="card-text">Categories</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-md-6 text-center">
                    <a href="/admin/users" style={{ textDecoration: "none" }}>
                        <div className="card bg-info text-white mb-3">
                            <div className="card-header">Total Users</div>
                            <div className="card-body">
                                <h4 className="card-title">{totalUsers}</h4>
                                <p className="card-text">View Users</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Helmet>
                <title>ATN Company</title>
            </Helmet>
            <Layout title={pageTitle} body={pageContent} />
        </div>
    )
}

export default Dashboard;