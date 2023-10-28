import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getProducts, deleteProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [categoryMap, setCategoryMap] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
        }
        const fetchCategories = async () => {
            const categories = await getCategories();
            const categoryMap = {};
            categories.forEach(category => {
                categoryMap[category._id] = category.name;
            });
            setCategoryMap(categoryMap);
        };
        fetchProducts();
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        await deleteProduct(id);
        const updateProducts = await getProducts();
        setProducts(updateProducts);
    };

    const handleConfirmDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            handleDelete(id);
            window.location.reload();
        }
    };

    const pageTitle = "Products";
    const pageButton = (
        <div className="d-flex justify-content-end">
            <a href="/admin/products/add" className="btn btn-primary">
                <i className="bi bi-plus-lg text-white"> Add Product</i>
            </a>
        </div>
    );
    const pageContent = (
        <div className="container">
            <table className="table align-middle mb-0 bg-white">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td style={{ width: "15%" }}>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={product.image}
                                        alt=""
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                </div>
                            </td>
                            <td style={{ width: "25%" }}><a href={`/admin/products/${product._id}`} style={{ textDecoration: "none" }}>{product.name}</a></td>
                            <td style={{ width: "20%" }}><a href={`/admin/products/${product._id}`} style={{ textDecoration: "none" }}>{categoryMap[product.category]}</a></td>
                            <td style={{ width: "15%" }}>${product.price}</td>
                            <td style={{ width: "15%" }}>{product.quantity}</td>
                            <td style={{ width: "10%" }}>
                                <a href={`/admin/products/edit/${product._id}`}>
                                    <button className="btn btn-primary btn-sm" style={{ width: "40px", height: "40px", marginRight: "5px" }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </a>
                                <button className="btn btn-danger btn-sm" onClick={() => handleConfirmDelete(product._id)} style={{ width: "40px", height: "40px" }}>
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

export default ProductsList;