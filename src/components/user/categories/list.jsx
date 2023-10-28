import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getCategories } from "../../../api/categories";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        };
        fetchCategories();
    }, []);

    const pageTitle = "List Categories";
    const pageContent = (
        <div className="container">
            <h2 className="text-center pb-5">List Categories</h2>
            <div className="row">
                {categories.map((category) => (
                    <div className="col-md-3 pt-2" key={category._id}>
                        <div className="card mb-4">
                            <a href={`/categories/${category._id}`}>
                                <img
                                    src={category.image}
                                    className="card-img-top"
                                    alt={category.name}
                                    style={{ cursor: "pointer" }}
                                />
                            </a>
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
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
    )
}

export default CategoriesList;