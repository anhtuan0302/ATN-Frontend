import React, { useState, useEffect } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getUserOrders } from "../../../api/orders";
import moment from "moment";

const MyAccount = () => {
    const [userOrders, setUserOrders] = useState([]);
    const email = sessionStorage.getItem("userEmail");

    function formatDate(dateString) {
        const formattedDate = moment(dateString).format('DD/MM/YYYY');
        return formattedDate;
    }

    useEffect(() => {
        const fetchUserOrders = async () => {
            const orders = await getUserOrders(email);
            setUserOrders(orders);
        };
        fetchUserOrders();
    }, [email]);

    const pageTitle = "My Account";

    const pageContent = (
        <div className="container">
            <h2 className="text-center pb-5">My Account</h2>
            <div className="row">
                <div className="col-4 p-4 border" style={{ background: "white", borderRadius: "10px", marginRight: "100px" }}>
                </div>
                <div className="col-7 p-4 border" style={{ background: "white", borderRadius: "10px" }}>
                    <h5 style={{ paddingBottom: "10px" }}>My Orders</h5>
                    {userOrders.length > 0 ? (
                        <table className="table align-middle mb-0 bg-white">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Total Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>#{order.orderId}</td>
                                        <td>{formatDate(order.orderDate)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <a href={`my-account/orders/${order._id}`} style={{ textDecoration: "none" }}>View Details <i class="bi bi-info-circle"></i></a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No orders found.</p>
                    )}
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
}

export default MyAccount;
