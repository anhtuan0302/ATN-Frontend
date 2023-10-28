import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { addProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async () => {
        if (!name || !category || !price) {
            alert("Please fill in all required fields!");
            return;
        }
        const product = {
            name: name,
            category: category,
            description: description,
            price: price,
            quantity: quantity,
            image: image,
        };
        await addProduct(product);
    };

    const handleAlert = () => {
        alert("Add product successfully");
    };

    const handleResetFields = () => {
        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setImage("");
    };

    const pageTitle = "Add Product";
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
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" name="name" id="" className="form-control" placeholder="Name of product" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price:</label>
                        <input type="number" name="price" id="" className="form-control" placeholder="Price of product" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="text" name="image" id="" className="form-control" placeholder="Image of product" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select name="category" id="" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a category of product</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input type="number" name="quantity" id="" className="form-control" placeholder="Quantity of product" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" id="" cols="30" rows="5" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <div className="mb-3 text-center">
                <button onClick={() => { handleSubmit(); handleAlert(); handleResetFields() }} className="btn btn-success">Add Product</button>
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
}

export default AddProduct;