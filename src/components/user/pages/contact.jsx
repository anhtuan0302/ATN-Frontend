import React from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";

const Contact = () => {
    const pageTitle = "Contact";
    const pageContent = (
        <div className="container">
            <h1>Contact</h1>
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

export default Contact;