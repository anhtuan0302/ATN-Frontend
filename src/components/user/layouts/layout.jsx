import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Navbar from "./navbar";
import Footer from "./footer";
import Slide from "./slide";

const Layout = ({ body }) => {
    const location = useLocation();
    return (
        <div style={{backgroundColor: "#F5F5F5"}}>
            <NavbarWrappe>
                <Navbar />
            </NavbarWrappe>

            {location.pathname === "/" && <Slide />}


            <MainWrapper>
                {body}
            </MainWrapper>

            <FooterWrapper className="border-top">
                <Footer />
            </FooterWrapper>
        </div>
    )
}

export default Layout;

const NavbarWrappe = styled.div`
    background-color: #FFFFFF;
`

const MainWrapper = styled.div`
    padding: 80px 0px 60px 0px;
`

const FooterWrapper = styled.div`
    background-color: white;
    padding: 20px 0px 1px 0px;
    bottom: 0;
    width: 100%;
    left: 0;
`