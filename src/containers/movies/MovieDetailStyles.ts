import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
            minHeight: "75vh",
        },
        container: {
            display: "flex",
            flexWrap: "wrap",
            alignContent: "stretch",
            overflow: "hidden",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "90vw",
            margin: "auto",
        },
        containerMobile: {
            display: "flex",
            flexWrap: "wrap",
            alignContent: "stretch",
            overflow: "hidden",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            margin: "auto",
        },
        content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "40px",
        },
        description: {
            fontSize: "large",
            margin: 5,
        },
        row: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "row",
        },
        column: {
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
        },
        blankDiv: {
            height: 50,
        },
        plot: {
            display: "flex",
            alignSelf: "flex-start",
            width: "100%",
            marginTop: 15,
        },
        image: {
            position: "relative",
        },
        responsive: {
            width: "100%",
            height: "auto",
        },
        icon: {
            position: "absolute",
            top: 5,
            right: 0,
            padding: "2px 10px",
        },
        linkMenu: {
            fontSize: "large",
            "&:hover": {
                color: "#00394d",
            },
        },
    })
);
