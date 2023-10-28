import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../layouts/layout";
import { getProductById, editProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import { useParams } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        price: 0,
        quantity: 0,
        image: "",
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const product = await getProductById(id);
            setProduct(product);
        };
        const fetchCategories = async () => {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
        };
        fetchProducts();
        fetchCategories();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        await editProduct(id, product);
    };

    const handleAlert = () => {
        alert("Edit product successfully");
    };

    const pageTitle = "Edit Product";
    const pageButton = (
        <div className="d-flex justify-content-end">
            <a href="/admin/products" className="btn btn-primary">
                <i className="bi bi-list text-white"> Prouducts List</i>
            </a>
        </div>
    );

    const pageContent = (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={product.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price:
                        </label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={product.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Image:
                        </label>
                        <input
                            type="text"
                            name="image"
                            className="form-control"
                            value={product.image}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            Category:
                        </label>
                        <select
                            name="category"
                            className="form-control"
                            value={product.category}
                            onChange={handleInputChange}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            value={product.quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description:
                        </label>
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            className="form-control"
                            value={product.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="mb-3 text-center">
                <button onClick={() => { handleSubmit(); handleAlert() }} className="btn btn-success">
                    Save Changes
                </button>
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

export default EditProduct;
