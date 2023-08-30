import { style } from "@vanilla-extract/css";
import { themeClass, vars } from "../../theme.css";
import { setBorder } from "../../helpers";

export const InputCss = style([
  themeClass,
  {
    //  text-primary rounded-md border border-border bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-border-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
    display: "flex",
    height: "2.5rem",
    width: "100%",
    ...setBorder(vars.colors.ghost, "2px"),
    borderRadius: vars.border.lg,
    backgroundColor: vars.colors.background,
    paddingInline: vars.spacing.objPadding,
    margin: 0,
    fontSize: vars.font.size.md,
    selectors: {
      "&:disabled": {
        opacity: "0.5"
      },
      "&:focus": {
        outline: "none",
        ...setBorder(vars.colors.background, "2px")
      }
    }

    // "::placeholder": {color: vars.text.default},
  }
]);
