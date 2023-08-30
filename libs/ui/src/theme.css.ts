import { createTheme } from "@vanilla-extract/css";

const buttonX = ".5";
const buttonY = ".7";

export const [themeClass, vars] = createTheme({
  spacing: {
    objPadding: "0.6rem",
    button: `${buttonY}rem ${buttonX}rem`,
    buttonX: `${buttonX}rem`,
    buttonY: `${buttonY}rem`
  },
  colors: {
    accent: "#C4D7FA",
    accentHover: "rgba(196,215,250, 0.6)",
    background: "#EFEFEF",
    danger: "rgb(255,0,0)",
    ghost: "rgba(220,220,220, 0.5)"
  },
  text: {
    default: "#000",
    foreground: "#3D3D3D"
  },
  border: {
    md: "0.3rem",
    sm: "calc(0.35rem - 2px)",
    lg: "calc(0.35rem + 2px)"
  },
  font: {
    weight: {
      normal: "500",
      slim: "400",
      semibold: "600",
      bold: "700"
    },
    size: {
      sm: "0.8rem",
      md: "1rem",
      lg: "1.4rem",
      xl: "1.8rem",
      xxl: "2.5rem",
      xxxl: "3.25rem",
      xxxxl: "4rem",
      fuckingBig: "4.5rem"
    }
  }
});

export interface IBreakPoints {
  smMobile: string;
  mobile: string;
  sm: string;
  md: string;
  lg: string;
}

export const breakPoints: IBreakPoints = {
  smMobile: "600px",
  mobile: "800px",
  sm: "1200px",
  md: "1400px",
  lg: "1600px"
};
