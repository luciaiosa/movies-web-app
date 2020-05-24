import { makeStyles, createStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles(() =>
    createStyles({
        appMenu: {
            width: "100%"
        },
        navList: {
            width: drawerWidth
        },
        menuItem: {
            width: drawerWidth
        },
        menuItemIcon: {
            width: 15,
            height: 15
        },
        linkMenu: {
            textDecoration: "none",
            fontWeight: 400,
            fontSize: "x-large",
            color: "#424548",
            marginRight: 20,
            alignSelf: "center",
            paddingLeft: 10,
            "&:hover": {
                color: "white"
            }
        },
        linksContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    })
);
