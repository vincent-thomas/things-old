import { style, StyleRule } from "@vanilla-extract/css";
import { IBreakPoints, breakPoints, themeClass, vars } from "../../theme.css";

interface Base {
  "@media": {
    [key: string]: {
      [key: string]: unknown;
    };
  };
}

const createStyle = (
  key: keyof StyleRule,
  normal: string,
  test: Partial<typeof breakPoints>
) => {
  const base: Base = {
    [key]: normal,
    "@media": {}
  };

  Object.entries(test).map((v: [string, unknown], index: number) => {
    base["@media"][
      `screen and (min-width: ${breakPoints[v[0] as keyof IBreakPoints]})`
    ] = {
      [key]: v[1]
    };
    return null;
  });
  return base;
};

export const title = style([
  themeClass,
  {
    color: vars.text.foreground,
    fontWeight: vars.font.weight.bold,

    ...createStyle("fontSize", vars.font.size.xxl, {
      smMobile: vars.font.size.xxxxl,
      mobile: vars.font.size.fuckingBig
    })
  }
]);
