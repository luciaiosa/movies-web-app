import React from "react";
import { Rating } from "../../store/movies/MovieStore";
import "./Ratings.scss";

interface IRatingProps {
    ratings: Rating[];
}

export const Ratings = (props: IRatingProps) => {
    const { ratings } = props;
    const renderRating = (ratings: Rating[]): JSX.Element[] => {
        return ratings.map((rating: Rating, index: number) => {
            return (
                <div className="flex rating" key={`ratingmovie${index}`}>
                    <div className="source">
                        <span>{rating.Source}:</span>
                    </div>
                    <div className="value">
                        <span>{rating.Value}</span>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="flex flex-direction--column ratings-container">
            <div className="ratings-title">Ratings</div>
            <div>{renderRating(ratings)}</div>
        </div>
    );
};
