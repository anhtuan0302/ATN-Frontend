import React, { useState, useEffect } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getUserOrders } from "../../../api/orders";
import moment from "moment";

const ListOrders = () => {
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
            <h2 className="text-center pb-5">My Order</h2>
            <div className="row">
                <div className="col-12 border" style={{ background: "white", borderRadius: "10px" , padding: "80px 50px 80px 50px"}}>
                    {userOrders.length > 0 ? (
                        <table className="table align-middle mb-0 bg-white">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Total Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td style={{width: "8%"}}>#{order.orderId}</td>
                                        <td style={{width: "12%"}}>{formatDate(order.orderDate)}</td>
                                        <td style={{width: "20%"}}>{order.email}</td>
                                        <td style={{width: "15%"}}>{order.phone}</td>
                                        <td style={{width: "18%"}}>{order.address}</td>
                                        <td style={{width: "15%"}}>${order.totalPrice}</td>
                                        <td style={{width: "12%"}}>
                                            <a href={`orders/${order._id}`} style={{ textDecoration: "none" }}>View Details <i class="bi bi-info-circle"></i></a>
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

export default ListOrders;
