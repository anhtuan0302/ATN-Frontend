import React from "react";
import styled from "styled-components";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Footer from "./footer";

const Layout = ({title, body, button}) => {
    return(
        <div className="container-fluid">
            <div className="row">
                <LeftCol className="col-2">
                    <Sidebar />   
                </LeftCol>
                <RightCol className="col-10">
    
                        <NavbarWrapper>
                            <Navbar />
                        </NavbarWrapper>
                        
                        <TitleWrapper>
                            <h1>{title}</h1>
                            <div className="button">{button}</div>
                            {title === "Dashboard" ? "" : <div><a href="/admin/dashboard">Dashboard</a> / {title}</div>}
                        </TitleWrapper>

                        <MainWrapper>
                            {body}
                        </MainWrapper>

                        <FooterWrapper>
                            <Footer />
                        </FooterWrapper>

                </RightCol>
            </div>
        </div>
    )
}

const LeftCol = styled.div`
    background-color: #111C43;
    min-height: 100vh;
`;

const RightCol = styled.div`
    padding: 30px 60px 0px 60px;
    min-height: 100vh;
    background-color: #F2F1F9;
`;

const NavbarWrapper = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 15px;
    margin: 0px;
    width: 100%;
`;

const TitleWrapper = styled.div`
    margin: 30px 0px;
    padding: 0px 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
        font-size: 30px;
        font-weight: 600;
        color: #111C43;
    }
    a {
        text-decoration: none;
        color: #111C43;
        font-weight: 500;
    }
    .button {
        margin-left: 40%;
    }
`;

const MainWrapper = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 15px 20px 15px;
    margin: 25px 0px;
    width: 100%;
    overflow: auto;
    min-height: 62vh;
`;

const FooterWrapper = styled.div`
    margin: 0px;
    width: 100%;
`;

export default Layout;