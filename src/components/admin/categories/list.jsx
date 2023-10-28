import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getCategories, deleteCategory } from "../../../api/categories";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        };
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        await deleteCategory(id);
        const updateCategories = await getCategories();
        setCategories(updateCategories);
    };

    const handleConfirmDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            handleDelete(id);
            window.location.reload();
        }
    };

    const pageTitle = "Categories";

    const pageButton = (
        <div className="d-flex justify-content-end">
            <a href="/admin/categories/add" className="btn btn-primary">
                <i className="bi bi-plus-lg text-white"> Add Category</i>
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td style={{ width: "35%" }}>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={category.image}
                                        alt=""
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                </div>
                            </td>
                            <td style={{ width: "45%" }}><a href={`/admin/categories/${category._id}`} style={{ textDecoration: "none" }}>{category.name}</a></td>
                            <td style={{ width: "20%" }}>
                                <a href={`/admin/categories/edit/${category._id}`}>
                                    <button className="btn btn-primary btn-sm" style={{ width: "40px", height: "40px", marginRight: "5px" }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </a>
                                <button className="btn btn-danger btn-sm" onClick={() => handleConfirmDelete(category._id)} style={{ width: "40px", height: "40px" }}>
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

export default CategoriesList;