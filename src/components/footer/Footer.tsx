import React, { FunctionComponent } from "react";
import {styles} from './FooterStyles';

interface FooterProps {
    content: string;
}
const Footer: FunctionComponent<FooterProps> = (
    props: FooterProps
): JSX.Element => {
    const classes = styles();
    
    return (
        <div className={classes.container}>
            <span className={classes.content}>{props.content}</span>
        </div>
    );
};

export default Footer;
