import { StyleRule } from "@vanilla-extract/css";

export const setBorder = (color: string, thickNess: string): StyleRule => ({
  border: `${thickNess} solid ${color}`
});
