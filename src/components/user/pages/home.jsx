import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getCategories } from "../../../api/categories";

const Home = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        };
        fetchCategories();
    }, []);

    const pageTitle = "ATN Shop";
    const pageContent = (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-2 text-center bg-transparent border-0">
                        <a href="/categories/653aa96474d28a90e9b0122f">
                            <img
                                src="https://image.smythstoys.com/images/secondary/toys/dreamworks-trolls-band-together-08-23-8507b7.webp"
                                className="card-img-top"
                                style={{ cursor: "pointer", width:"90%", height:"90%" }}
                            />
                        </a>
                        <div className="card-body text-center">
                            <h4 className="card-title">Trolls Brand Together</h4>
                            <p className="card-text">Check out the toys from the new movie</p>
                            <a href="/categories/653aa96474d28a90e9b0122f" className="btn btn-primary">Shop Now</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-2 text-center bg-transparent border-0">
                        <a href="/categories/6534f1ed0e5d0383a10c0897">
                            <img
                                src="https://image.smythstoys.com/images/secondary/gaming/marvel-spider-man-2-06-23-b30605.webp"
                                className="card-img-top"
                                style={{ cursor: "pointer", width:"90%", height:"90%"  }}
                            />
                        </a>
                        <div className="card-body text-center">
                            <h4 className="card-title">Out Now</h4>
                            <p className="card-text">Be Greater. Together - Marvel's Spider-Man 2</p>
                            <a href="/categories/6534f1ed0e5d0383a10c0897" className="btn btn-primary">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pt-5">
                <h4>Shop toys by category</h4>
                {categories.slice(0, 4).map((category) => (
                    <div className="col-md-3 pt-2" key={category._id}>
                        <div className="card mb-3">
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

export default Home;