import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const userEmail = sessionStorage.getItem('userEmail');

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <Header class="navbar navbar-expand-lg navbar-light bg-white">
            <div class="container">
                <div className="d-flex align-items-center">
                    <i class="bi bi-bell-fill" style={{paddingRight: "5px"}}></i>Notice
                    <form class="d-flex me-auto" style={{marginLeft: "20%"}}>
                        <input class="form-control me-2" type="search" placeholder="Search product..." aria-label="Search" />
                        <button class="btn btn-primary" type="submit">Search</button>
                    </form>
                    <a className="nav-link" href="/account">
                        <i className="bi bi-person"></i> My Account
                    </a>
                    <a className="nav-link" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                    </a>
                </div>
            </div>
        </Header >
    )
}

export default Navbar;

const Header = styled.header`
    ul.navbar-nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        list-style: none;
    }

    li.nav-item {
        margin-right: 35px;
    }

    a.nav-link {
        color: black;
        text-decoration: none;
        font-size: 17px;
    }
`
