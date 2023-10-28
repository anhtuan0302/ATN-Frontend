import React from "react";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";

const Slide1 = process.env.PUBLIC_URL + "/images/slides/Slide1.png";
const Slide2 = process.env.PUBLIC_URL + "/images/slides/Slide2.png";
const Slide3 = process.env.PUBLIC_URL + "/images/slides/Slide3.png";

function Slide() {
    return (
        <Carousel interval={5000}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Slide1}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Slide2}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Slide3}
                />
            </Carousel.Item>
        </Carousel>
    )
};

export default Slide;