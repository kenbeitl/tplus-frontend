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
import { ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';

// Local Components & Contexts
import Logo from '@/assets/images/Logo';
import { DropdownListItem, NavigationListItem } from '@/components/NavigationComponents';
import { useLanguage, useTranslations, useDrawer, localeLabels, type Locale } from '@/contexts/AppContext';
import { SnackbarProvider } from '@/contexts/SnackbarContext';
import StyledIcon from '@/components/StyledIcon';
import { useLogout } from '@/lib/logout';
import { getSVGIcon } from '@/helpers/utils';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { menuIconSize } from '@/helpers/constants'
import theme from '@/theme/theme';
import { ActionButton, Tag } from '@/components';

const drawerWidth = 240;
const drawerMiniWidth = 64;

interface serviceProps {
  serviceName: string;
  icon: React.ReactNode;
  path: string;
  isActive?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isAboveDesktop?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'disableTransition' && prop !== 'isAboveDesktop',
})<AppBarProps & { disableTransition?: boolean }>(({ theme, open, disableTransition, isAboveDesktop }) => ({
  border: 0,
  borderBottom: '1px solid ' + theme.palette.divider,
  marginLeft: open ? drawerWidth : (isAboveDesktop ? drawerMiniWidth : 0),
  width: open ? `calc(100% - ${drawerWidth}px)` : (isAboveDesktop ? `calc(100% - ${drawerMiniWidth}px)` : '100%' ),
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 1,
  transition: disableTransition ? 'none' : theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open 
      ? theme.transitions.duration.enteringScreen 
      : theme.transitions.duration.leavingScreen,
  }),
}));

const drawerMixin = (theme: Theme, open: boolean, disableTransition = false, isAboveDesktop = true): CSSObject => ({
  width: open ? drawerWidth : (isAboveDesktop ? `calc(${theme.spacing(8)} + 1px)` : 0),
  height: '100%',
  transition: disableTransition ? 'none' : theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: open 
      ? theme.transitions.duration.enteringScreen 
      : theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  position: !isAboveDesktop && open ? 'fixed' : undefined,
  zIndex: theme.zIndex.drawer,
  top: 0,
  borderRight: (!open && !isAboveDesktop) ? 'none' : `1px solid ${theme.palette.divider}`
});

const Drawer = styled(MuiDrawer, { 
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'disableTransition' && prop !== 'isAboveDesktop'
})<{ open?: boolean; disableTransition?: boolean; isAboveDesktop?: boolean }>(
  ({ theme, open = false, disableTransition, isAboveDesktop = true }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...drawerMixin(theme, open, disableTransition, isAboveDesktop),
    '& .MuiDrawer-paper': drawerMixin(theme, open, disableTransition, isAboveDesktop),
  }),
);

// Add this styled component with the other styled components
const Overlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'show'
})<{ show: boolean }>(({ show }) => ({
  visibility: show ? 'visible' : 'hidden',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  zIndex: theme.zIndex.drawer - 1,
  transition: 'opacity 0.3s ease-in-out',
  opacity: show ? 1 : 0,
}));

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
  const isAboveDesktop = useBreakpoint('desktop');

  const user = session?.user;
  const logout = useLogout();
  
  const serviceList: serviceProps[] = t('nav.serviceList');

  // Enable transitions after initial mount and drawer state is loaded
  React.useEffect(() => {

    // Small delay to ensure drawer state is loaded from localStorage
    const timer = setTimeout(() => {
      setIsInitialMount(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Close drawer when resizing to mobile
  React.useEffect(() => {
    if (!isAboveDesktop && drawerOpen) {
      toggleDrawer();
    }
  }, [isAboveDesktop]);

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
    // Close drawer when navigating
    if (drawerOpen) {
      toggleDrawer();
    }
    // Close menus if open
    handleClose();
    handleUserMenuClose();
    router.push(path);
  };

  const getInitials = (username: string | null | undefined) => {
    return username?.split(' ').map(n => n[0]).join('').toUpperCase() || 'TD';
  };


  return (
    <SnackbarProvider>
      <Box component="div" className="app-layout min-h-screen">
        <Box className="flex">
          <AppBar 
            position="fixed"
            color="transparent"
            elevation={0}
            open={drawerOpen}
            disableTransition={isInitialMount}
            isAboveDesktop={isAboveDesktop}
          >
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="menu"
              color="inherit"
              onClick={handleDrawerClick}
            >
              { getSVGIcon('panel-left', menuIconSize, 'black') }
            </IconButton>
            <div className="grow" />
            <Box component="div">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                { getSVGIcon('globe', menuIconSize, 'black') }
              </IconButton>
              <Menu
                id="language-menu"
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                {Object.entries(localeLabels).map(([localeKey, label]) => (
                  <MenuItem 
                    key={localeKey}
                    onClick={() => handleLanguageChange(localeKey as Locale)}
                    selected={locale === localeKey}
                    sx={{ justifyContent: 'center', px: 1 }}
                  >
                    {label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            
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
                  icon={<Box component="span" className="text-base">{ getInitials(user?.name) }</Box>} 
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
              sx={{
                '& .MuiPaper-root': {
                  width: 224
                }
              }}
            >
              { user && 
                <Box component="div" sx={{ px: 2, py: 1 }}>
                  <Box component="div"><Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{user?.name}</Typography></Box>
                  <Box component="div"><Typography variant="caption">{user?.email}</Typography></Box>
                  <Box component="div"><Typography variant="caption">Demo company</Typography></Box>
                  <Tag variant="white" label="Users" className="!inline-flex" />
                </Box>
              }
              <Divider sx={{ m: '0 !important' }} />
              <MenuItem onClick={() => handleNavigation('/settings')}>
                <ListItemIcon sx={{ minWidth: '24px !important' }}>
                  { getSVGIcon('user', 16) }
                </ListItemIcon>
                <ListItemText primary={t('common.profile')} />
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/settings')}>
                <ListItemIcon sx={{ minWidth: '24px !important' }}>
                  { getSVGIcon('settings', 16) }
                </ListItemIcon>
                <ListItemText primary={t('nav.settings')} />
              </MenuItem>
              <Divider sx={{ m: '0 !important' }} />
              <MenuItem sx={{ justifyContent: 'center', mt: 1 }}>
                <ActionButton
                  variant="gradient"
                  startIcon={getSVGIcon('arrow-right-bracket', 12, 'white')}
                  buttonText={t('common.signOut')}
                  onClick={handleLogout}
                  autoWidth
                />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer 
          variant="permanent" 
          open={drawerOpen}
          disableTransition={isInitialMount}
          isAboveDesktop={isAboveDesktop}
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
              icon={ getSVGIcon('home', menuIconSize) }
              primary={t('nav.dashboard')}
              path="/dashboard"
              onClick={handleNavigation}
            />
            
            {/* Services Dropdown */}
            <DropdownListItem
              icon={ getSVGIcon('building2') }
              primary={t('nav.services')}
              storageKey="dropdown_services"
            >
              {
                  Array.isArray(serviceList) && serviceList.map((service: any, index: number) => (
                    <NavigationListItem
                      key={index}
                      level={2}
                      icon={getSVGIcon(service.icon, menuIconSize)}
                      primary={service.name}
                      path={service.path}
                      isComingSoon={!service.isActive}
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
              icon={ getSVGIcon('shopping-cart', menuIconSize) }
              primary={t('nav.subscriptions')}
              path="/subscriptions"
              onClick={handleNavigation}
            />
            
            {/* Settings Navigation */}
            <NavigationListItem
              level={1}
              icon={ getSVGIcon('settings', menuIconSize) }
              primary={t('nav.settings')}
              path="/settings"
              onClick={handleNavigation}
            />

            {/* Help Centre Navigation */}
            <NavigationListItem
              level={1}
              icon={ getSVGIcon('help-circle-icon', menuIconSize) }
              primary={t('nav.helpCentre')}
              path="/help-centre"
              onClick={handleNavigation}
            />
            
          </List>
        </Drawer>
        {/* Overlay component */}
        <Overlay 
          show={!isAboveDesktop && drawerOpen}
          onClick={handleDrawerClick}
        />
        <Box component="main" sx={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          width: isAboveDesktop 
            ? (drawerOpen ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${drawerMiniWidth}px)`)
            : '100%',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: drawerOpen 
              ? theme.transitions.duration.enteringScreen 
              : theme.transitions.duration.leavingScreen,
          }),
        }}>
          <DrawerHeader />
          { children }
        </Box>
      </Box>
    </Box>
    </SnackbarProvider>
  );
}