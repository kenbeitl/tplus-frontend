'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
    };
  }
  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#333333',
      secondary: '#919191',
    },
    gradient: {
      primary: 'linear-gradient(90deg,rgba(0, 73, 220, 1) 0%, rgba(0, 125, 220, 1) 100%);',
      secondary: 'linear-gradient(90deg,rgba(255, 176, 102, 1) 0%, rgba(255, 92, 51, 1) 100%);',
    }
  },
  typography: {
    fontSize: 12,
    fontFamily: 'var(--font-roboto), "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 10,
  }
});

export default theme;