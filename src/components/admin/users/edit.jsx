import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../layouts/layout";
import { getUserById, editUser } from "../../../api/users";
import { useParams } from "react-router-dom";

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        email: "",
        name: "",
        role: "",
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const user = await getUserById(id);
            setUser(user);
        };
        fetchUsers();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        await editUser(id, user);
    };

    const handleAlert = () => {
        alert("Edit user successfully");
    };

    const pageTitle = "Edit User";
    const pageButton = (
        <div className="d-flex justify-content-end">
            <a href="/admin/users" className="btn btn-primary">
                <i className="bi bi-list text-white"> Users List</i>
            </a>
        </div>
    );

    const pageContent = (
        <div className="container" style={{ padding: "0px 150px" }}>
            <div className="mb-4">
                <label htmlFor="email" className="form-label">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={user.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="text" className="form-label">
                    Name:
                </label>
                <input
                    type="email"
                    name="name"
                    className="form-control"
                    value={user.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="role" className="form-label">
                    Role:
                </label>
                <select
                    name="role"
                    className="form-control"
                    value={user.role}
                    onChange={handleInputChange}
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
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

export default EditUser;
