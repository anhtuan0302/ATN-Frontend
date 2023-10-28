import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <StyledFooter className="fixed-footer">
            <p>COPYRIGHT © 2023 ATN Company</p>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
font-size: 12px;
text-align: center;
color: black;
`;

export default Footer;