import { createStyles, makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(() =>
    createStyles({
        container: {
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: "column",
            backgroundColor: "rgb(32, 35, 41)",
            color: "rgb(158, 158, 158)",
            height: 100,
            marginTop: 20
        },
        content: {
            alignSelf: "center",
            fontWeight: 600,
            wordSpacing: 5
        }
    })
);
