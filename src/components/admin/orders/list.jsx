import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getOrders, deleteOrder } from "../../../api/orders";
import moment from 'moment';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await getOrders();
            setOrders(orders);
        };
        fetchOrders();
    }, []);

    function formatDate(dateString) {
        const formattedDate = moment(dateString).format('DD/MM/YYYY');
        return formattedDate;
    }

    const handleDelete = async (id) => {
        await deleteOrder(id);
        const updateOrders = await getOrders();
        setOrders(updateOrders);
    };

    const handleConfirmDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (confirmDelete) {
            handleDelete(id);
            window.location.reload();
        }
    };

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

    function sortOrders(orders, criteria) {
        switch (criteria) {
            case 'lowestTotalPrice':
                return orders.sort((a, b) => a.totalPrice - b.totalPrice);
            case 'highestTotalPrice':
                return orders.sort((a, b) => b.totalPrice - a.totalPrice);
            case 'latestOrderDate':
                return orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
            case 'oldestOrderDate':
                return orders.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
            case 'paymentMethod':
                return orders.sort((a, b) => a.paymentMethod.localeCompare(b.paymentMethod));
            default:
                return orders;
        }
    }

    const sortedOrders = sortOrders(orders, sortCriteria);

    const pageTitle = "Orders";

    const pageButton = (
        <div className="d-flex justify-content-end">
            <select value={sortCriteria} onChange={handleSortChange} style={{padding: "5px 10px"}}>
                <option value="">-- Sort by --</option>
                <option value="lowestTotalPrice">Lowest total price</option>
                <option value="highestTotalPrice">Highest total price</option>
                <option value="latestOrderDate">Latest order date</option>
                <option value="oldestOrderDate">Oldest order date</option>
                <option value="paymentMethod">Payment method</option>
            </select>
        </div>
    );

    const pageContent = (
        <div className="container">
            <table className="table align-middle mb-0 bg-white">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Payment method</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedOrders.map((order) => (
                        <tr key={order._id}>
                            <td style={{ width: "5%" }}><a href={`/admin/orders/${order._id}`} style={{ textDecoration: "none" }}>#{order.orderId}</a></td>
                            <td style={{ width: "10%" }}>{formatDate(order.orderDate)}</td>
                            <td style={{ width: "25%" }}>{order.email}</td>
                            <td style={{ width: "15%" }}>{order.phone}</td>
                            <td style={{ width: "15%" }}>{order.address}</td>
                            <td style={{ width: "10%" }}>${order.totalPrice}</td>
                            <td style={{ width: "15%" }}>{order.paymentMethod}</td>
                            <td style={{ width: "5%" }}>
                                <button className="btn btn-danger btn-sm" onClick={() => handleConfirmDelete(order._id)} style={{ width: "40px", height: "40px" }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Layout title={pageTitle} button={pageButton} body={pageContent} />
        </div>
    )
}

export default OrdersList;