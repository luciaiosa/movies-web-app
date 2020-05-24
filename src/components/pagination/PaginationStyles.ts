import { createStyles, makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(() =>
    createStyles({
        center: {
            marginBottom: 10,
            marginTop: 10,
            display: "flex",
            justifyContent: "center"
        },

        paginationList: {
            color: "black",
            float: "left",
            padding: "8px 16px",
            textDecoration: "none",
            transition: "background-color 0.3s",
            border: "1px solid #ddd"
        },

        paginationListItem: {
            color: "black",
            float: "left",
            padding: "8px 16px",
            textDecoration: "none",
            transition: "background-color 0.3s",
            border: "1px solid #ddd",
            cursor: "pointer",
            listStyle: "none",
            "&:hover": {
                backgroundColor: "#ccccb3"
            }
        },
        active: {
            backgroundColor: "#3782a3",
            color: "white",
            border: "border: 1px solid #3782a3",
            "&:hover": {
                backgroundColor: "#064460"
            }
        },
        disabled: {
            pointerEvents: "none",
            opacity: 0.6,
            cursor: "not-allowed"
        }
    })
);
