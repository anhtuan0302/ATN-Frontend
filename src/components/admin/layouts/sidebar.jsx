import React from "react";
import styled from "styled-components";

const Logourl = process.env.PUBLIC_URL + "/images/Logo-White.png";


const Sidebar = () => {
    return (
        <>
            <Logo>
                <img src={Logourl} alt="" />
            </Logo>

            <Menu>
                <h5>Menu</h5>
                <MenuList>
                    <li><a href="/admin/dashboard"><i className="bi bi-house"></i>Dashboard</a></li>
                    <li><a href="/admin/orders"><i className="bi bi-cart2"></i>Orders</a></li>
                    <li><a href="/admin/products"><i className="bi bi-folder"></i>Products</a></li>
                    <li><a href="/admin/categories"><i className="bi bi-tags"></i>Categories</a></li>
                    <br /> <br />
                    <li><a href="/admin/users"><i className="bi bi-person"></i>Users</a></li>
                </MenuList>
            </Menu>
            
        </>
    )
}

const Logo = styled.div`
    text-align: center;
    margin: 40px 0;
    img {
        width: 65%;
        height: auto;
    }
`;

const Menu = styled.div`
    list-style: none;
    padding: 35px 20px;
    h5 {
        font-size: 23px;
        color: #dbdbdb;
        margin-bottom: 15px;
    }
`;

const MenuList = styled.ul`
    list-style: none;
    padding: 0 25px;
    li {
        margin-bottom: 20px;
        a {
            text-decoration: none;
            color: #A3AED1;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            i {
                margin-right: 10px;
                font-size: 22px;
            }
            &:hover {
                color: #ffffff;
            }
        }
    }
`;

export default Sidebar;