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
  purple: 'linear-gradient(90deg, rgba(168, 85, 247, 1) 0%, rgba(99, 102, 241, 1) 100%)',
};

// Custom palette extensions
type CustomPaletteExtension = {
  icon: {
    green: string;
    black: string;
  };
  gradient: typeof GRADIENTS;
  tag: {
    green: ColorConfig;
    blue: ColorConfig;
    white: ColorConfig;
    grey: ColorConfig;
  };
};

declare module '@mui/material/styles' {
  interface Palette extends CustomPaletteExtension {}
  
  interface PaletteOptions {
    icon?: Partial<CustomPaletteExtension['icon']>;
    gradient?: Partial<CustomPaletteExtension['gradient']>;
    tag?: Partial<CustomPaletteExtension['tag']>;
  }
  
  interface TypeBackground {
    lightblue: string;
    red: string;
  }
  
  interface TypeText {
    red: string;
    darkAmber: string;
    blue: string;
    darkBlue: string;
    green: string;
    lightGreen: string;
    indigo: string;
    orange: string;
    gold: string;
    yellow: string;
    purple: string;
    darkPurple: string;
    white: string;
    black: string;
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
      red: '#ef4444',
      darkAmber: '#78350F',
      blue: '#2563eb',
      darkBlue: '#1C398E',
      indigo: '#4f46e5',
      green: '#016630',
      lightGreen: '#00a63e',
      orange: '#D35400',
      gold: '#ca8a04',
      yellow: '#FCD34D',
      purple: '#9333ea',
      darkPurple: '#6B21A8',
      white: '#FFFFFF',
      black: '#000000',
    },
    icon: {
      green: '#43A047',
      black: '#000000',
    },
    background: {
      lightblue: '#eff6ff',
      red: 'red',
    },
    gradient: GRADIENTS,
    tag: {
      green: {
        background: '#dcfce7',
        text: '#016630',
      },
      blue: {
        background: '#84baff',
        text: '#000000',
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
    fontFamily: 'Roboto, Arial, sans-serif',
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
          // Gradient text styles
          '& .gradient-text-blue': {
            background: GRADIENTS.blue,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          },
          '& .gradient-text-orange': {
            background: GRADIENTS.orange,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          },
          '& .gradient-text-purple': {
            background: GRADIENTS.purple,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
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
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '10px 14px',
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
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          flexGrow: 1,
          color: '#000000',
          minHeight: 32,
          fontSize: 14,
          fontWeight: 600,
          textTransform: 'none',  
          
          '&.Mui-selected': {
            color: '#000000',
            backgroundColor: '#FFFFFF',
            borderRadius: '5rem',
            borderBottom: 0,
          },
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
            color: '#FFFFFF !important',
            background: GRADIENTS.blue,
          },
        },
        {
          props: { variant: 'gradient', color: 'purple' },
          style: {
            color: '#FFFFFF !important',
            background: GRADIENTS.purple,
          },
        },
        {
          props: { variant: 'gradient', color: 'orange' },
          style: {
            color: '#FFFFFF !important',
            background: GRADIENTS.orange,
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
            borderColor: 'rgba(0, 0, 0, 0.12)',
          },
        },
        {
          props: { variant: 'contained', color: 'primary' },
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
          props: { variant: 'contained', color: 'error' },
          style: {
            color: '#FFFFFF',
            backgroundColor: '#d32f2f',
            boxShadow: 'none',
            border: '1px solid #d32f2f',
            '&:hover': {
              color: '#d32f2f',
              backgroundColor: '#FFFFFF',
              borderColor: '#d32f2f',
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
              color: '#1C398E',
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