import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            minHeight: "100vh",
            position: "relative",
        },
    })
);
