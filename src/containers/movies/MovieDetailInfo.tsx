import React from "react";
import "./MovieDetailInfo.scss";

interface MovieDetailInfoProps {
    label: string;
    description: string | number;
}

export const MovieDetailInfo = (props: MovieDetailInfoProps) => {
    const { label, description } = props;
    return (
        <div className="flex movie-detail-info">
            <div className="font-size--large">
                <span>{label}:</span>
            </div>
            <div className="font-size--large">
                <span>{description}</span>
            </div>
        </div>
    );
};
