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

export const selectLabel = style({
  paddingBlock: '0.375rem',
  paddingLeft: '2rem',
  color: vars.text.default,
  fontWeight: vars.fontWeight.semibold,
});

export const selectItem = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
  cursor: 'default',
  alignItems: 'center',
  outline: 'none',
  borderRadius: vars.border.sm,
  fontSize: '14px',
  // focus:bg-accent select-none py-1.5 pl-8 pr-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50
  selectors: {
    '&:focus': {
      color: vars.text.foreground,
      backgroundColor: vars.colors.background,
    },
    '&[data-disabled]': {
      pointerEvents: 'none',
    },
  },
});
