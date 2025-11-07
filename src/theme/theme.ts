'use client';
import { backdropClasses } from '@mui/material';
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
    tag: {
      green: ColorConfig;
      white: ColorConfig;
      grey: ColorConfig;
    };
  }
  interface PaletteOptions {
    gradient?: Partial<typeof GRADIENTS>;
    tag?: {
      green?: ColorConfig;
      white?: ColorConfig;
      grey?: ColorConfig;
    };
  }
  interface TypeText {
    blue: string;
    darkBlue: string;
    green: string;
    indigo: string;
    orange: string;
    purple: string;
    white: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
  interface ButtonPropsColorOverrides {
    blue: true;
    darkBlue: true;
    green: true;
    indigo: true;
    orange: true;
    purple: true
    white: true;
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#333333',
      secondary: '#919191',
      blue: '#2563eb',
      darkBlue: '#1C398E',
      indigo: '#4f46e5',
      green: '#016630',
      orange: '#D35400',
      purple: '#9333ea',
      white: '#FFFFFF',
    },
    gradient: GRADIENTS,
    tag: {
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
    fontFamily: 'sans-serif',
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
          '& .tag-transparent': {
            color: 'inherit',
            background: 'transparent',
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
            color: theme.palette.tag.green.text,
            background: theme.palette.tag.green.background,
          },
          '& .tag-white': {
            color: theme.palette.tag.white.text,
            background: theme.palette.tag.white.background,
            border: '1px solid #e5e7eb',
          },
          '& .tag-outlined': {
            color: theme.palette.tag.grey.text,
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
          marginBottom: 6,
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: 4,
          alignSelf: 'center',
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontSize: '14px'
          }
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
        {
          props: { variant: 'outlined', color: 'white' },
          style: {
            color: '#666666',
            backgroundColor: '#FFFFFF',
            borderColor: '#666666',
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            color: '#FFFFFF',
            backgroundColor: '#2b7fff',
            boxShadow: 'none',
            border: '1px solid #2b7fff',
            '&:hover': {
              color: '#2b7fff',
              backgroundColor: '#FFFFFF',
              borderColor: '#2b7fff',
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: '#2b7fff',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: 'rgba(43, 127, 255, 0.1)',
            },
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