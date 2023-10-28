import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../layouts/layout";
import { getCategoryById, editCategory } from "../../../api/categories";
import { useParams } from "react-router-dom";

const EditCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({
        name: "",
        image: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const category = await getCategoryById(id);
            setCategory(category);
        };
        fetchCategories();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        await editCategory(id, category);
    };

    const handleAlert = () => {
        alert("Edit product successfully");
    };

    const pageTitle = "Edit Product";
    const pageButton = (
        <div className="d-flex justify-content-end">
            <a href="/admin/categories" className="btn btn-primary">
                <i className="bi bi-list text-white"> Categories List</i>
            </a>
        </div>
    );

    const pageContent = (
        <div className="container" style={{ padding: "0px 150px" }}>
            <div className="mb-4">
                <label htmlFor="name" className="form-label">
                    Name:
                </label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={category.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="form-label">
                    Image:
                </label>
                <input
                    type="text"
                    name="image"
                    className="form-control"
                    value={category.image}
                    onChange={handleInputChange}
                />
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

export default EditCategory;
