import React, { FunctionComponent } from "react";
import { styles } from "./ErrorStyles";

interface ErrorProps {
    title: string;
}

const CustomError: FunctionComponent<ErrorProps> = (
    props: ErrorProps
): JSX.Element => {
    const classes = styles();

    return (
        <div className={classes.content}>
            <h2>{props.title}</h2>
        </div>
    );
};

export default CustomError;
