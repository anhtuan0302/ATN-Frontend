import React, { useState, useEffect } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getOrderById } from "../../../api/orders";
import moment from "moment";
import { useParams } from "react-router-dom";

const DetailOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);

    function formatDate(dateString) {
        const formattedDate = moment(dateString).format('DD/MM/YYYY');
        return formattedDate;
    }

    useEffect(() => {
        const fetchOrder = async () => {
            const order = await getOrderById(id);
            setOrder(order);
            setProducts(order.products);
        };
        fetchOrder();
    }, [id]);

    const pageTitle = "Order Detail";

    const pageContent = (
        <div className="container">
            <h2 className="text-center pb-5">My Order</h2>
            <div className="row">
                <div className="col-4 p-4 border" style={{ background: "white", borderRadius: "10px", marginRight: "100px" }}>
                    <h5 style={{ paddingBottom: "20px" }}>Order Information</h5>
                    <p><strong>Order ID:</strong> #{order.orderId}</p>
                    <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                </div>
                <div className="col-7 p-4 border" style={{ background: "white", borderRadius: "10px" }}>
                    <h5 style={{ paddingBottom: "20px" }}>Order Products Information</h5>
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
            <Layout title={pageTitle} body={pageContent} />
        </div>
    );
};

export default DetailOrder;
