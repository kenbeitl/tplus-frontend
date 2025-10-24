'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#333333',
      secondary: '#919191',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto), "Helvetica", "Arial", sans-serif',
  },
});

export default theme;