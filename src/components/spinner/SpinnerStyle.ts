import { createStyles, makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  
  & .path {
    stroke: #5652BF;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const spinnerStyles = makeStyles(() =>
    createStyles({
        spinnerContainer: {
            display: "flex",
            opacity: 1,
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            textAlign: "center",
            verticalAlign: "middle",
            padding: "1em",
            backgroundColor: "rgba(0,0,0,.85)",
            lineHeight: 1,
            animationFillMode: "both",
            animationDuration: ".5s",
            transition: "background-color .5s linear",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            willChange: "opacity",
            zIndex: 1000,
            "&:before": {
                borderColor: "rgba(255, 255, 255, 0.15)",
                width: "2.28571429rem",
                height: "2.28571429rem",
                margin: "0 0 0 -1.14285714rem",
                position: "absolute",
                content: "",
                top: 0,
                left: "50%",
                borderRadius: "500rem",
                border: "0.2em solid rgba(0, 0, 0, 0.1)",
                boxSizing: "inherit"
            },
            "& div": {
                marginTop: "30px",
                color: "rgb(158,158,158)",
                margin: "-25px 0 0 -25px"
            }
        }
    })
);
