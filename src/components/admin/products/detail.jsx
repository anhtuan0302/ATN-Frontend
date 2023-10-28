import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getProductById } from "../../../api/products";
import { getCategoryById } from "../../../api/categories";
import Layout from "../layouts/layout";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getProductById(id);
            setProduct(product);
            const category = await getCategoryById(product.category);
            setCategoryName(category.name);
        };
        fetchProduct();
    }, [id]);

    const pageTitle = "Product Detail";

    const pageButton = (
        <div className="d-flex justify-content-end">
            <a href="/admin/products" className="btn btn-primary text-white">
                <i className="bi bi-list"></i> Prouducts List
            </a>
        </div>
    );

    const pageContent = (
        <div className="container">
            <div className="row">
                <div className="col-5">
                    <img
                        src={product.image} style={{ width: "400px", height: "400px" }}
                    />
                </div>
                <div className="col-7">
                    <h5 style={{ paddingBottom: "10px" }}>{product.name}</h5>
                    <p><strong>Category:</strong> {categoryName}</p>
                    <p><strong>Price: </strong> ${product.price}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p style={{ paddingBottom: "10px" }}><strong>Description:</strong> {product.description}</p>
                    <a href={`/admin/products/edit/${product._id}`}>
                        <button className="btn btn-primary btn-sm" style={{ width: "70px", height: "40px", marginRight: "10px" }}>
                            <i className="bi bi-pencil-square"></i> Edit
                        </button>
                    </a>
                    <button className="btn btn-danger btn-sm" style={{ width: "80px", height: "40px" }}>
                        <i className="bi bi-trash"></i> Delete
                    </button>
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

export default DetailProduct;
