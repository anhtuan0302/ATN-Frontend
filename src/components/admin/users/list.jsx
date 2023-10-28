import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";
import { getUsers, deleteUser } from "../../../api/users";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsers(users);
        }
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await deleteUser(id);
        const updateUsers = await getUsers();
        setUsers(updateUsers);
    };

    const handleConfirmDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            handleDelete(id);
            window.location.reload();
        }
    };

    const pageTitle = "Users";
    const pageContent = (
        <div className="container">
            <table className="table align-middle mb-0 bg-white">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td style={{ width: "35%" }}><a href={`mailto:${user.email}`} style={{ textDecoration: "none" }}>{user.email}</a></td>
                            <td style={{ width: "30%" }}>{user.name}</td>
                            <td style={{ width: "15%" }}>{user.role}</td>
                            <td style={{ width: "20%" }}>
                                {user.email !== 'admin@atn.com' ? (
                                    <a href={`/admin/users/edit/${user._id}`}>
                                        <button className="btn btn-primary btn-sm" style={{ width: "40px", height: "40px", marginRight: "5px" }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </a>
                                ) : null}
                                {user.email !== 'admin@atn.com' && user.role !== 'admin' ? (
                                    <button className="btn btn-danger btn-sm" onClick={() => handleConfirmDelete(user._id)} style={{ width: "40px", height: "40px" }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                ) : null}
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
            <Layout title={pageTitle} body={pageContent} />
        </div>
    )
}

export default UsersList;