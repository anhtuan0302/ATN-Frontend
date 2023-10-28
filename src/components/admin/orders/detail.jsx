import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getOrderById } from "../../../api/orders";
import Layout from "../layouts/layout";
import { useParams } from "react-router-dom";
import moment from 'moment';

const DetailOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            const order = await getOrderById(id);
            setOrder(order);
            setProducts(order.products);
        };
        fetchOrder();
    }, [id]);

    function formatDate(dateString) {
        const formattedDate = moment(dateString).format('DD/MM/YYYY');
        return formattedDate;
    }

    const pageTitle = "Order Detail";

    const pageButton = (
        <div className="d-flex justify-content-end">
            <a href="/admin/orders" className="btn btn-primary text-white">
                <i className="bi bi-list"> Orders List</i>
            </a>
        </div>
    );

    const pageContent = (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <p><strong>Order ID:</strong> #{order.orderId}</p>
                    <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p style={{ paddingBottom: "10px" }}><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    <a href={`/admin/orders/edit/`}>
                        <button className="btn btn-primary btn-sm" style={{ width: "70px", height: "40px", marginRight: "10px" }}>
                            <i className="bi bi-pencil-square"></i> Edit
                        </button>
                    </a>
                    <button className="btn btn-danger btn-sm" style={{ width: "80px", height: "40px" }}>
                        <i className="bi bi-trash"></i> Delete
                    </button>
                </div>
                <div className="col-8">
                    <table className="table align-middle mb-0 bg-white">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td style={{ width: "15%" }}>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={product.image}
                                                alt=""
                                                style={{ width: "80px", height: "80px" }}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ width: "30%" }}>{product.name}</td>
                                    <td style={{ width: "15%" }}>${product.price}</td>
                                    <td style={{ width: "15%" }}>{product.quantity}</td>
                                    <td style={{ width: "15%" }}>${product.price * product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end mt-3">
                        <h4>Total: ${order.totalPrice}</h4>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Layout title={pageTitle} button={pageButton} body={pageContent} />
        </div>
    );
};

export default DetailOrder;
