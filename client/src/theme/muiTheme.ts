import { createTheme } from '@mui/material/styles';

export const createMuiTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#1f1f1f' : '#ffffff',
        paper: mode === 'dark' ? '#1f1f1f' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
        secondary: mode === 'dark' ? '#b0b0b0' : '#666666',
      },
      divider: mode === 'dark' ? '#424242' : '#e0e0e0',
    },
  });
}; 