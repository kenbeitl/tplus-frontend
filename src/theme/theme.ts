'use client';

import { createTheme } from '@mui/material/styles';

type ColorConfig = {
  background: string;
  text: string;
};

// Gradient constants
const GRADIENTS = {
  // CSS gradients (for inline styles)
  blue: 'linear-gradient(90deg, rgba(0, 73, 220, 1) 0%, rgba(0, 150, 220, 1) 100%)',
  orange: 'linear-gradient(90deg, rgba(255, 176, 102, 1) 0%, rgba(255, 92, 51, 1) 100%)',
  purple: 'linear-gradient(90deg, rgba(168, 85, 247, 1) 0%, rgba(99, 102, 241, 1) 100%)',
  blueIndigo: 'linear-gradient(135deg, #3B82F6, #4F46E5)',
  greenEmerald: 'linear-gradient(to right, #10B981, #059669)',
  blueCyan: 'linear-gradient(to bottom right, #2563eb, #06b6d4)',
  indigoPurple: 'linear-gradient(to bottom right, #4f46e5, #7c3aed)',
  // Button gradients
  buttonBlue: 'linear-gradient(to right, #2563eb, #1d4ed8)',
  buttonBlueHover: 'linear-gradient(to right, #1d4ed8, #1e40af)',
  buttonEmerald: 'linear-gradient(to right, #059669, #047857)',
  buttonEmeraldHover: 'linear-gradient(to right, #047857, #065f46)',
  buttonPurple: 'linear-gradient(to right, #9333ea, #7e22ce)',
  buttonPurpleHover: 'linear-gradient(to right, #7e22ce, #6b21a8)',
};

// Tailwind gradient classes (for className usage)
const GRADIENT_CLASSES = {
  // Background gradients - Blue family
  blueLight: 'bg-linear-to-br from-blue-100 via-cyan-50 to-indigo-100',
  blueCyan: 'bg-linear-to-br from-blue-600 to-cyan-600',
  blueIndigo: 'bg-linear-to-br from-blue-500 to-indigo-600',
  blueIndigoDark: 'bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600',
  blueIndigoAuth: 'bg-linear-to-br from-blue-100 via-indigo-100 to-purple-200',
  blueGreenLight: 'bg-linear-to-r from-blue-50 to-green-50',
  
  // Background gradients - Purple family
  purpleIndigoLight: 'bg-linear-to-r from-purple-50 to-indigo-50',
  purplePinkLight: 'bg-linear-to-br from-purple-100 via-pink-50 to-rose-100',
  indigoPurple: 'bg-linear-to-br from-indigo-500 to-purple-700',
  indigoPurplePink: 'bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50',
  
  // Background gradients - Green family
  greenEmerald: 'bg-linear-to-r from-green-500 to-emerald-600',
  greenEmeraldTeal: 'bg-linear-to-r from-green-500 via-emerald-600 to-teal-600',
  greenLight: 'bg-linear-to-r from-green-50 to-emerald-50',
  
  // Background gradients - Slate/Gray family
  slateBlueLight: 'bg-linear-to-r from-slate-50 to-blue-50',
  slateBlueIndigoLight: 'bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50',
  grayLight: 'bg-linear-to-b from-gray-50 to-white',
  
  // Icon/Badge gradients
  iconBlue: 'bg-linear-to-r from-blue-500 to-blue-700',
  iconBlueIndigo: 'bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600',
  iconBlueIndigoBg: 'bg-linear-to-br from-blue-500 to-indigo-600',
  iconBlueLight: 'bg-linear-to-br from-blue-100 to-indigo-100',
  iconGreen: 'bg-linear-to-br from-green-600 to-emerald-600',
  iconGreenLight: 'bg-linear-to-br from-green-100 to-teal-100',
  iconEmerald: 'bg-linear-to-br from-emerald-500 to-emerald-600',
  iconPurple: 'bg-linear-to-br from-purple-600 to-indigo-600',
  iconPurpleGradient: 'bg-linear-to-br from-purple-500 to-purple-600',
  iconPurplePink: 'bg-linear-to-br from-purple-600 to-pink-600',
  iconIndigoPurple: 'bg-linear-to-br from-indigo-500 to-purple-600',
  iconOrange: 'bg-linear-to-br from-orange-500 to-red-600',
  iconRed: 'bg-linear-to-br from-red-500 to-red-700',
  iconGray: 'bg-linear-to-r from-gray-400 to-gray-500',
  
  // Hero section gradients
  heroBlue: 'bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800',
  heroIndigo: 'bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600',
  heroPurple: 'bg-linear-to-br from-purple-600 via-indigo-600 to-blue-700',
  heroEmerald: 'bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-700',
  heroCyan: 'bg-linear-to-br from-cyan-600 via-blue-600 to-indigo-700',
  heroViolet: 'bg-linear-to-br from-violet-600 via-purple-600 to-fuchsia-700',
};

// Custom palette extensions
type CustomPaletteExtension = {
  icon: {
    green: string;
    lightGreen: string;
    black: string;
    blue: string;
  };
  gradient: typeof GRADIENTS;
  gradientClasses: typeof GRADIENT_CLASSES;
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
    gradientClasses?: Partial<CustomPaletteExtension['gradientClasses']>;
    tag?: Partial<CustomPaletteExtension['tag']>;
  }
  
  interface TypeBackground {
    lightblue: string;
    red: string;
    darkGrey: string;
    black: string;
    slate: string;
  }
  
  interface TypeText {
    red: string;
    darkAmber: string;
    blue: string;
    darkBlue: string;
    cyan: string;
    sky: string;
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
    purple: true;
    white: true;
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#333333',
      secondary: '#475569',
      red: '#ef4444',
      darkAmber: '#78350F',
      blue: '#2563eb',
      darkBlue: '#1C398E',
      cyan: '#06b6d4',
      sky: '#0ea5e9',
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
      lightGreen: '#22c55e',
      black: '#000000',
      blue: '#2563eb',
    },
    background: {
      lightblue: '#eff6ff',
      red: 'red',
      darkGrey: '#1f2937',
      black: '#000000',
      slate: '#F8FAFC',
    },
    gradient: GRADIENTS,
    gradientClasses: GRADIENT_CLASSES,
    tag: {
      green: {
        background: '#dcfce7',
        text: '#016630',
      },
      blue: {
        background: '#DBEAFE',
        text: '#1D4ED8',
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
    fontSize: 16,  // Increased from 16 to 18
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',      // 45px (was 40px)
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',        // 36px (was 32px)
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',     // 31.5px (was 28px)
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',      // 27px (was 24px)
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',     // 22.5px (was 20px)
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',        // 18px (was 16px)
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',        // 18px (was 16px)
      fontWeight: 500,         // Increased from 400
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',    // 15.75px (was 14px)
      fontWeight: 500,         // Increased from 400
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',        // 18px (was 16px)
      fontWeight: 400,
      lineHeight: 1.6,         // Increased for better readability
    },
    body2: {
      fontSize: '0.875rem',    // 15.75px (was 14px)
      fontWeight: 400,
      lineHeight: 1.6,         // Increased for better readability
      color: '#666666',
    },
    button: {
      fontSize: '1rem',        // 18px (was 14px)
      fontWeight: 500,         // Increased from 400
      lineHeight: 1.75,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',     // 13.5px (was 12px)
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#666666',
    },
    overline: {
      fontSize: '0.75rem',     // 13.5px (was 12px)
      fontWeight: 500,         // Increased from 400
      lineHeight: 2,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        html: {
          fontSize: 18, // Set base font-size for rem calculations
        },
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
          '&:last-of-type': {
            marginBottom: 0,
          },
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
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          color: '#000000',
          minHeight: 32,
          fontSize: 16,
          textTransform: 'none',
          transition: 'all 0.3s ease',
          
          '&:hover': {
            background: '#FFFFFF',
            borderRadius: '5rem',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08)',
          },
          
          '&.Mui-selected': {
            color: '#FFFFFF',
            background: GRADIENTS.blue,
            borderRadius: '5rem',
            borderBottom: 0,
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          fontSize: 16,
          lineHeight: 2.25,
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
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
          props: { variant: 'gradient', color: 'green' },
          style: {
            color: '#FFFFFF !important',
            background: GRADIENTS.greenEmerald,
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
            borderColor: '#E0E0E0',
            backgroundColor: '#FFFFFF',
          },
        },
        {
          props: { variant: 'outlined', color: 'blue' },
          style: {
            color: '#2b7fff',
            backgroundColor: '#FFFFFF',
            borderColor: '#bedbff',
            '&:hover': {
              borderColor: '#2b7fff',
              backgroundColor: '#eff6ff',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'green' },
          style: {
            color: '#016630',
            backgroundColor: '#FFFFFF',
            borderColor: '#bedbff',
            '&:hover': {
              borderColor: '#43A047',
              backgroundColor: '#dcfce7',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'white' },
          style: {
            color: '#666666',
            backgroundColor: '#FFFFFF',
            borderColor: 'rgba(0, 0, 0, 0.12)',
            '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.32)',
              backgroundColor: '#f5f5f5',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'orange' },
          style: {
            color: '#D35400',
            backgroundColor: '#FFFFFF',
            borderColor: '#fed7aa',
            '&:hover': {
              borderColor: '#fb923c',
              backgroundColor: '#ffedd5',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: '#FFFFFF',
            backgroundColor: '#2b7fff',
            boxShadow: 'none',
            border: '1px solid #2b7fff',
            '&.Mui-disabled': {
              border: 0,
            },
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
          props: { variant: 'contained', color: 'orange' },
          style: {
            color: '#FFFFFF',
            backgroundColor: '#ea580c',
            boxShadow: 'none',
            border: '1px solid #ea580c',
            '&:hover': {
              color: '#ea580c',
              backgroundColor: '#FFFFFF',
              borderColor: '#ea580c',
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
              boxShadow: '0px 1px 3px rgba(43, 127, 255, 0.3)',
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