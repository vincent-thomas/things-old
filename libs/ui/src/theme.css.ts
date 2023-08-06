import { createTheme } from '@vanilla-extract/css';

const buttonX = '.5';
const buttonY = '.7';

export const [themeClass, vars] = createTheme({
  spacing: {
    objPadding: '0.6rem',
    button: `${buttonY}rem ${buttonX}rem`,
    buttonX: `${buttonX}rem`,
    buttonY: `${buttonY}rem`,
  },
  colors: {
    accent: '#C4D7FA',
    accentHover: 'rgba(196,215,250, 0.6)',
    background: '#FFF',
    danger: 'rgb(255,0,0)',
    ghost: 'rgba(220,220,220, 0.5)',
  },
  text: {
    default: '#000',
    foreground: '#fff',
  },
  border: {
    md: '0.35rem',
    sm: 'calc(0.35rem - 2px)',
    lg: 'calc(0.35rem + 2px)',
  },
  fontWeight: {
    normal: '500',
    slim: '400',
    semibold: '600',
    bold: '700',
  },
});
