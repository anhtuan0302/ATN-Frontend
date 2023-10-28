import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Logourl = process.env.PUBLIC_URL + "/images/Logo-Dark.png";

const Navbar = () => {
  const userEmail = sessionStorage.getItem('userEmail');

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleCart = () => {
    if (userEmail) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <Header className="border-bottom">
      <div className="container d-flex justify-content-between align-items-center" style={{ padding: "8px 0px" }}>
        <a className="navbar-brand" href="/">
          <img src={Logourl} alt="ATN" width="150" />
        </a>
        <ul className="navbar-nav d-flex list-unstyled ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/products">Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/categories">Categories</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact</a>
          </li>
        </ul>
        <input type="search" name="search" placeholder="Search product..." style={{ marginLeft: "10px", padding: "7px", border: "1px solid #ccc", fontSize: "15px" }}/>
        <div className="d-flex">
          {userEmail ? (
            userEmail === 'admin@atn.com' ? (
              <div className="d-flex align-items-center">
                <a className="nav-link" href="/admin">
                  <i className="bi bi-person"></i> Admin Dashboard
                </a>
                <a className="nav-link" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </a>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <a className="nav-link" href="/my-account">
                  <i className="bi bi-person"></i> My Account
                </a>
                <a className="nav-link" onClick={handleCart}>
                  <i className="bi bi-cart"></i> Cart
                </a>
                <a className="nav-link" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </a>
              </div>
            )
          ) : (
            <div className="d-flex align-items-center">
              <a className="nav-link" href="/login">
                <i className="bi bi-person"></i> Login
              </a>
              <a className="nav-link" onClick={handleCart}>
                <i className="bi bi-cart"></i> Cart
              </a>
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

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
`;
