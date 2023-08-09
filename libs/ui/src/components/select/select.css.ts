import { style } from '@vanilla-extract/css';
import { themeClass, vars } from '../../theme.css';

export const selectIcon = style([
  themeClass,
  {
    height: '1rem',
    width: '1rem',
    opacity: 0.5,
  },
]);

export const viewPortBase = style({
  padding: '0.25rem',
});

export const viewPortPopper = style({
  height: 'var(--radix-select-trigger-height)',
  width: '100%',
  minWidth: 'var(--radix-select-trigger-width)',
});

export const selectLabel = style([themeClass,{
  paddingBlock: '0.375rem',
  paddingLeft: '2rem',
  color: vars.text.default,
  fontWeight: vars.font.weight.semibold,
}]);

export const selectItem = style([themeClass,{
  display: 'flex',
  position: 'relative',
  width: '100%',
  cursor: 'default',
  alignItems: 'center',
  outline: 'none',
  borderRadius: vars.border.sm,
  fontSize: '14px',
  // focus:bg-accent select-none py-1.5 pl-8 pr-2 data-[disabled]:pointer-events-none
  selectors: {
    '&:focus': {
      color: vars.text.foreground,
      backgroundColor: vars.colors.accent,
    },
    '&[data-disabled]': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
}]);


export const SelectItemInner = style([themeClass, {
  position: "absolute",
  left: "0.5rem",
  display: "flex",
  height: "0.875rem",
  width: "0.875rem",
  alignItems: "center",
  justifyContent: "center",
}])

export const SelectItemIcon = style({
  width: "1rem",
  height: "1rem",
})


export const SelectTrigger = style([themeClass,{
  height: "2.5rem",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: vars.border.md,
  borderWidth: "1px",
  background: "transparent",
  display: "flex",
  width: "100%",
  selectors: {
    "&:focus": {
      outline: "none"
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed"
    }
  }
}])