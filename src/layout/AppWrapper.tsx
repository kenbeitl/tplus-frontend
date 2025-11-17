"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// MUI Components
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';

// Icons
import { Building, Building2, CreditCard, FilePenLine, Globe, HelpCircleIcon, House, LogOut, PanelLeft, Settings, Shield, ShoppingCart } from 'lucide-react';

// Local Components & Contexts
import Logo from '@/assets/svg/Logo';
import { DropdownListItem, NavigationListItem } from '@/components/NavigationComponents';
import { useLanguage, useTranslations, useDrawer, localeLabels, type Locale } from '@/contexts/AppContext';
import { SnackbarProvider } from '@/contexts/SnackbarContext';
import StyledIcon from '@/components/StyledIcon';
import { useLogout } from '@/lib/logout';

const drawerWidth = 240;
const drawerMiniWidth = 64;

const openedMixin = (theme: Theme, disableTransition = false): CSSObject => ({
  width: drawerWidth,
  transition: disableTransition ? 'none' : theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme, disableTransition = false): CSSObject => ({
  transition: disableTransition ? 'none' : theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'disableTransition',
})<AppBarProps & { disableTransition?: boolean }>(({ theme, open, disableTransition }) => ({
  border: 0,
  borderBottom: '1px solid ' + theme.palette.divider,
  marginLeft: open ? drawerWidth : drawerMiniWidth,
  width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${drawerMiniWidth}px)`,
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 1,
  transition: disableTransition ? 'none' : theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open 
      ? theme.transitions.duration.enteringScreen 
      : theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, { 
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'disableTransition' 
})<{ open?: boolean; disableTransition?: boolean }>(
  ({ theme, disableTransition }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme, disableTransition),
          '& .MuiDrawer-paper': openedMixin(theme, disableTransition),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme, disableTransition),
          '& .MuiDrawer-paper': closedMixin(theme, disableTransition),
        },
      },
    ],
  }),
);

export default function AppWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const { drawerOpen, toggleDrawer } = useDrawer();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isInitialMount, setIsInitialMount] = React.useState(true);

  const user = session?.user;
  const username = user?.name;
  const logout = useLogout();

  // Check authentication status with NextAuth
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Enable transitions after initial mount and drawer state is loaded
  React.useEffect(() => {

    // Small delay to ensure drawer state is loaded from localStorage
    const timer = setTimeout(() => {
      setIsInitialMount(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  interface serviceListType {
    icon: React.ReactNode;
    label: string;
    path: string;
    coming_soon?: boolean;
  }

  const serviceList = [
    {
      icon: <FilePenLine />,
      label: t('nav.signConnect'),
      path: '/services/sign-connect'
    },
    {
      icon: <Building2 />,
      label: t('nav.bizConnect'),
      path: '/services/biz-connect',
      coming_soon: true
    },
    { 
      icon: <CreditCard />, 
      label: t('nav.payConnect'),
      path: '/services/pay-connect'
    },
    {
      icon: <Building />,
      label: t('nav.govConnect'),
      path: '/services/gov-connect'
    },
    {
      icon: <Shield />,
      label: t('nav.safeConnect'),
      path: '/services/safe-connect'
    },
  ]

  const handleDrawerClick = () => {
    toggleDrawer();
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  }

  const handleLogout = async () => {
    handleUserMenuClose();
    await logout();
  }

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    handleClose();
  };

  // Navigation handler
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const getInitials = (username: string | null | undefined) => {
    return username?.split(' ').map(n => n[0]).join('').toUpperCase() || 'TD';
  };


  return (
    <SnackbarProvider>
      <div className="app-layout min-h-screen">
        <Box className="flex">
          <AppBar 
            position="fixed"
            color="transparent"
            elevation={0}
            open={drawerOpen}
            disableTransition={isInitialMount}
          >
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="menu"
              color="inherit"
              onClick={handleDrawerClick}
            >
              <PanelLeft size={20} color={'#000000'} />
            </IconButton>
            <div className="grow" />
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Globe size={20} color={'#000000'} />
            </IconButton>
            <Menu
              id="language-menu"
              keepMounted
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {Object.entries(localeLabels).map(([localeKey, label]) => (
                <MenuItem 
                  key={localeKey}
                  onClick={() => handleLanguageChange(localeKey as Locale)}
                  selected={locale === localeKey}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
            {status === 'authenticated' && session && 
              <IconButton
                aria-label="user menu"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
                sx={{ p: 0, ml: 1 }}
              >
                <StyledIcon 
                  icon={getInitials(username)} 
                  variant="gray"
                  size={40}
                />
              </IconButton>
            }
            <Menu
              id="user-menu"
              keepMounted
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleLogout}>
                <LogOut size={16} style={{ marginRight: 8 }} />
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer 
          variant="permanent" 
          open={drawerOpen}
          disableTransition={isInitialMount}
        >
          <DrawerHeader>
            <Logo open={drawerOpen} />
          </DrawerHeader>
          <List 
            className="grow w-full max-w-sm"
            component="nav"
          >
            {/* Dashboard Navigation */}
            <NavigationListItem
              level={1}
              icon={<House />}
              primary={t('nav.dashboard')}
              path="/"
              onClick={handleNavigation}
            />
            
            {/* Services Dropdown */}
            <DropdownListItem
              icon={<Building2 />}
              primary={t('nav.services')}
              storageKey="dropdown_services"
            >
              { 
                serviceList.map((service: serviceListType, index) => (
                  <NavigationListItem
                    key={index}
                    level={2}
                    icon={service.icon}
                    primary={service.label}
                    path={service.path}
                    isComingSoon={service.coming_soon || false}
                    onClick={handleNavigation}
                  />
                )) 
              }
            </DropdownListItem>
          </List>
          <Divider />
          <List
            className="w-full max-w-sm"
            component="nav"
          >
            {/* Subscription Navigation */}
            <NavigationListItem
              level={1}
              icon={<ShoppingCart />}
              primary={t('nav.subscriptions')}
              path="/subscriptions"
              onClick={handleNavigation}
            />
            
            {/* Settings Navigation */}
            <NavigationListItem
              level={1}
              icon={<Settings />}
              primary={t('nav.settings')}
              path="/settings"
              onClick={handleNavigation}
            />

            {/* Help Centre Navigation */}
            <NavigationListItem
              level={1}
              icon={<HelpCircleIcon />}
              primary={t('nav.helpCentre')}
              path="/help-centre"
              onClick={handleNavigation}
            />
            
          </List>
        </Drawer>
        <Box component="main" sx={{ width: '100%' }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </div>
    </SnackbarProvider>
  );
}