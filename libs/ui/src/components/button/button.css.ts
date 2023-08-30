import { type StyleRule, style, createVar } from "@vanilla-extract/css";
import { themeClass, vars } from "../../theme.css";
import { setBorder } from "../../helpers";

const borderThick = createVar();

const base = style([
  themeClass,
  {
    vars: {
      [borderThick]: "2px"
    },
    border: "none",
    outline: "none",
    display: "inline-flex",
    alignItems: "center",
    padding: vars.spacing.button,
    backgroundColor: "transparent",
    paddingBlock: `calc(${vars.spacing.buttonX} - ${borderThick})`,
    paddingInline: `calc(${vars.spacing.buttonY} - ${borderThick})`,
    justifyContent: "center",
    borderRadius: vars.border.md,
    fontWeight: vars.font.weight.normal,
    fontSize: "1rem",
    transition: "all 0.25s ease-out",
    cursor: "pointer",
    ":disabled": {
      opacity: "0.5",
      cursor: "initial",
      border: `${borderThick} solid transparent !important`,
      backgroundColor: "transparent !important",
      color: `${vars.text.default} !important`
    }
  }
]);

export default style([
  base,
  {
    backgroundColor: vars.colors.accent,
    color: vars.text.default,
    ...setBorder(vars.colors.accent, borderThick),
    ":hover": {
      backgroundColor: vars.colors.accentHover,
      ...setBorder(vars.colors.accentHover, borderThick)
    }
  }
]);

export const destructive = style([
  base,
  {
    color: vars.text.default,
    ...setBorder(vars.colors.danger, borderThick),
    ":hover": {
      backgroundColor: vars.colors.danger,
      color: vars.text.foreground
    }
  }
]);

export const outline = style([
  base,
  {
    color: vars.text.default,
    ...setBorder(vars.colors.accent, borderThick),
    ":hover": {
      backgroundColor: vars.colors.accentHover
    }
  }
]);

export const ghost = style([
  base,
  {
    color: vars.text.default,
    ...setBorder("transparent", borderThick),
    ":hover": {
      backgroundColor: vars.colors.ghost,
      ...setBorder(vars.colors.ghost, borderThick)
    }
  }
]);
export const link = style([
  base,
  {
    color: vars.text.default,
    textUnderlineOffset: "4px",
    ...setBorder("transparent", borderThick),

    selectors: {
      "&:hover": {
        textDecorationLine: "underline"
      },
      "&:hover:disabled": {
        textDecorationLine: "none"
      }
    }
  }
]);
