'use client';
import { createTheme } from '@mui/material/styles';

type ColorConfig = {
  background: string;
  text: string;
};

// Gradient constants
const GRADIENTS = {
  blue: 'linear-gradient(90deg, rgba(0, 73, 220, 1) 0%, rgba(0, 150, 220, 1) 100%)',
  orange: 'linear-gradient(90deg, rgba(255, 176, 102, 1) 0%, rgba(255, 92, 51, 1) 100%)',
} as const;

declare module '@mui/material/styles' {
  interface Palette {
    gradient: typeof GRADIENTS;
    plain: {
      green: ColorConfig;
      white: ColorConfig;
      grey: ColorConfig;
    };
  }
  interface PaletteOptions {
    gradient?: Partial<typeof GRADIENTS>;
    plain?: {
      green?: ColorConfig;
      white?: ColorConfig;
      grey?: ColorConfig;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
  interface ButtonPropsColorOverrides {
    blue: true;
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#333333',
      secondary: '#919191',
    },
    gradient: GRADIENTS,
    plain: {
      green: {
        background: '#dcfce7',
        text: '#016630',
      },
      white: {
        background: '#FFFFFF',
        text: '#000000',
      },
      grey: {
        background: '#555555',
        text: '#FFFFFF',
      }
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: 'var(--font-roboto), "Helvetica", "Arial", sans-serif',
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1rem',
      color: '#666666',
    },
    caption: {
      fontSize: '0.875rem',
      color: '#666666',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          // Base overlay class with common styles
          '& .bg-overlay, & .bg-overlay-light, & .bg-overlay-heavy': {
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
            },
            '& > *:not(.tag)': {
              position: 'relative',
              zIndex: 1,
            },
          },
          // Specific overlay intensities
          '& .bg-overlay::before': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          '& .bg-overlay-light::before': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
          '& .bg-overlay-heavy::before': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
          // Reusable tag classes
          '& .tag': {
            background: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: '10px',
            padding: '0 8px',
            fontSize: '0.75rem',
            fontWeight: 500,
            lineHeight: 1.5,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            '&.text-only': {
              padding: 0
            },
            '& svg': {
              width: '1rem'
            }
          },
          '& .tag-orange': {
            color: '#FFFFFF',
            background: theme.palette.gradient.orange,
          },
          '& .tag-blue': {
            color: '#FFFFFF',
            background: theme.palette.gradient.blue,
          },
          '& .tag-green': {
            color: theme.palette.plain.green.text,
            background: theme.palette.plain.green.background,
          },
          '& .tag-white': {
            color: theme.palette.plain.white.text,
            background: theme.palette.plain.white.background,
            border: '1px solid #e5e7eb',
          },
          '& .tag-outlined': {
            color: theme.palette.plain.grey.text,
            background: '#555555',
            border: '1px solid #999999',
          },
        },
      }),
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#666666',
          '&.Mui-focused': {
            color: '#0049DC',
          },
          '&.Mui-error': {
            color: '#d32f2f',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .Mui-disabled': {
            cursor: 'not-allowed',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginTop: 6,
          marginRight: 4,
          alignSelf: 'start',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          lineHeight: 1.5,
          fontSize: '0.9rem',
          '&:disabled': {
            color: '#FFFFFF',
            opacity: 0.6,
          }
        },
      },
      variants: [
        {
          props: { variant: 'gradient', color: 'blue' },
          style: {
            color: '#FFFFFF',
            background: GRADIENTS.blue,
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: '#666666',
            borderColor: '#666666',
          },
        },
        {
          props: { variant: 'outlined', color: 'blue' },
          style: {
            color: '#2b7fff',
            backgroundColor: '#FFFFFF',
            borderColor: '#bedbff',
          },
        },
      ],
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;