import React, { FunctionComponent } from "react";
import "./Footer.scss";

interface FooterProps {
    content: string;
}
const Footer: FunctionComponent<FooterProps> = (
    props: FooterProps
): JSX.Element => {
    return (
        <div className="flex flex-direction--column footer-container">
            <span className="content">{props.content}</span>
        </div>
    );
};

export default Footer;
