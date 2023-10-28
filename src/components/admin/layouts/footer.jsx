import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <StyledFooter>
            <p>COPYRIGHT © 2023 ATN Company</p>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
font-size: 15px;
text-align: center;
`;

export default Footer;