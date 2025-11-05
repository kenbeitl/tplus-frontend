'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      blue: string;
      orange: string;
    };
    plain: {
      green : {
        background: string;
        text: string;
      };
    };
  }
  interface PaletteOptions {
    gradient?: {
      blue?: string;
      orange?: string;
    };
    plain?: {
      green?: {
        background: string;
        text: string;
      };
    }
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
    gradient: {
      blue: 'linear-gradient(90deg,rgba(0, 73, 220, 1) 0%, rgba(0, 150, 220, 1) 100%);',
      orange: 'linear-gradient(90deg,rgba(255, 176, 102, 1) 0%, rgba(255, 92, 51, 1) 100%);',
    },
    plain: {
      green : {
        background: '#dcfce7',
        text: '#016630',
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
    }
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
          '& .tag, & .tag-outlined, & .tag-orange, & .tag-blue, & .tag-green': {
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
            '& svg': {
              width: '1rem'
            }
          },
          '.tag-outlined, & .tag-orange, & .tag-blue': {
            color: '#FFFFFF',
          },
          '& .tag-orange': {
            background: 'linear-gradient(90deg,rgba(255, 176, 102, 1) 0%, rgba(255, 92, 51, 1) 100%)',
          },
          '& .tag-blue': {
            background: 'linear-gradient(90deg,rgba(0, 73, 220, 1) 0%, rgba(0, 150, 220, 1) 100%)',
          },
          '& .tag-green': {
            background: theme.palette.plain.green.background,
            color: theme.palette.plain.green.text,
          },
          '& .tag-outlined': {
            border: '1px solid #999999',
            background: '#555555',
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
            background: 'linear-gradient(90deg,rgba(0, 73, 220, 1) 0%, rgba(0, 150, 220, 1) 100%);',
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: '#666666',
            borderColor: '#666666'
          }
        },
        {
          props: { variant: 'outlined', color: 'blue' },
          style: {
            color: '#2b7fff',
            backgroundColor: '#FFFFFF',
            borderColor: '#bedbff'
          }
        }
      ]
    }
  },
  shape: {
    borderRadius: 10,
  }
});

export default theme;