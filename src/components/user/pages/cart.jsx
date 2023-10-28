import React, { useState, useEffect } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../../api/orders";

const Cart = () => {
    const navigate = useNavigate();

    const pageTitle = "Cart";
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [email, setEmail] = useState(sessionStorage.getItem("userEmail") || "");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCart(savedCart);
        calculateTotalPrice(savedCart);
    }, []);

    const calculateTotalPrice = (cart) => {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total);
    };

    const handleRemoveFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);

        setCart(updatedCart);
        calculateTotalPrice(updatedCart);

        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleSubmit = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add product to cart!");
            return;
        }
        if (!address && !phone && !paymentMethod) {
            alert("Please fill in all required fields!");
            return;
        }
        const order = {
            email: email,
            products: cart,
            totalPrice: totalPrice,
            address: address,
            phone: phone,
            paymentMethod: paymentMethod,
        };
        await addOrder(order);
    };

    const handleConfirmOrder = () => {
        const confirmOrder = window.confirm("Are you sure you want to order?");
        if (confirmOrder) {
            handleSubmit();
            handleResetFields();
            navigate("/");
        }
    };

    const handleResetFields = () => {
        sessionStorage.removeItem("cart");
        setCart([]);
        setTotalPrice(0);
        setEmail("");
        setPhone("");
        setAddress("");
        setPaymentMethod("");
    };

    const pageContent = (
        <div className="container">
            <h2 className="text-center" style={{ paddingBottom: "40px" }}>Cart</h2>
            <div className="row">
                <div className="col-7 p-4 border" style={{ background: "white", borderRadius: "10px", marginRight: "100px" }}>
                    <table className="table align-middle mb-0 bg-white">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ width: "15%" }}>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={item.image}
                                                alt=""
                                                style={{ width: "50px", height: "50px" }}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ width: "30%" }}>{item.name}</td>
                                    <td style={{ width: "15%" }}>${item.price}</td>
                                    <td style={{ width: "15%" }}>{item.quantity}</td>
                                    <td style={{ width: "15%" }}>${item.price * item.quantity}</td>
                                    <td style={{ width: "5%" }}>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(index)} style={{ width: "40px", height: "40px" }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end mt-3">
                        <h4>Total: ${totalPrice}</h4>
                    </div>
                </div>
                <div className="col-4 p-4 border" style={{ background: "white", borderRadius: "10px" }}>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Phone:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="form-label">
                            Address:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="payment" className="form-label">
                            Payment method:
                        </label>
                    </div>
                    <div className="form-check mb-2">
                        <input className="form-check-input" type="radio" name="paymentMethod" value="On delivery" onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label className="form-check-label" for="paymentMethod">
                            On delivery
                        </label>
                    </div>
                    <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" name="paymentMethod" value="Transfer" onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label className="form-check-label" for="paymentMethod">
                            Transfer
                        </label>
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-success" onClick={() => { handleConfirmOrder() }}>Order</button>
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

export default Cart;
