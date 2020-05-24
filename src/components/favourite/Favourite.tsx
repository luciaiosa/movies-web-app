import React from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import "./Favourite.scss";

interface FavouriteProps {
    isFavourite: boolean;
    add(): void;
    remove(): void;
}

export const Favourite = (props: FavouriteProps) => {
    const { isFavourite, add, remove } = props;
    const renderFavourite = (isFavourite: boolean) => {
        if (!isFavourite) {
            return (
                <StarBorderIcon
                    fontSize="large"
                    onClick={add}
                    className="icon"
                />
            );
        }
        return <StarIcon fontSize="large" onClick={remove} className="icon" />;
    };
    return <div className="favourite-icon">{renderFavourite(isFavourite)}</div>;
};
