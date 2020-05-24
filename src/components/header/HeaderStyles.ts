import { createStyles, makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(() =>
    createStyles({
        container: {
            backgroundColor: "#3782a3",
            height: 110,
            display: "flex",
            flexDirection: "column",
        },
        menuContainer: {
            borderRadius: 0,
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2rem 80px",
            fontFamily: "Lato, Arial, Helvetica, sans-serif",
            fontWeight: 600,
            minHeight: "3rem",
        },
        link: {
            textDecoration: "none",
        },
        linkMenu: {
            marginRight: 20,
            alignSelf: "center",
            paddingLeft: 10,
            width: "auto",
        },
        logoLink: {
            fontWeight: 400,
            fontSize: "x-large",
            color: "white",
            "&:hover": {
                color: "	 #80dfff",
            },
        },
    })
);
