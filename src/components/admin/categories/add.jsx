import React from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { addCategory } from "../../../api/categories";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async () => {
        if (!name || !image) {
            alert("Please fill in all required fields!");
            return;
        }
        const category = {
            name: name,
            image: image,
        };
        await addCategory(category);
    };

    const handleAlert = () => {
        alert("Add category successfully");
    };

    const handleResetFields = () => {
        setName("");
        setImage("");
    };

    const pageTitle = "Add category";
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
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" id="name" name="name" className="form-control" placeholder="Name category" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="form-label">Image:</label>
                <input type="text" id="image" name="image" className="form-control" placeholder="Image category" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className="mb-3 text-center">
                <button type="button" className="btn btn-success" onClick={() => { handleSubmit(); handleAlert(); handleResetFields() }}>Add Category</button>
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
    )
};

export default AddCategory;