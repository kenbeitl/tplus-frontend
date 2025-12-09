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
import { Building2, Globe, HelpCircleIcon, House, LogOut, PanelLeft, Settings, ShoppingCart } from 'lucide-react';

// Local Components & Contexts
import Logo from '@/assets/svg/Logo';
import { DropdownListItem, NavigationListItem } from '@/components/NavigationComponents';
import { useLanguage, useTranslations, useDrawer, localeLabels, type Locale } from '@/contexts/AppContext';
import { SnackbarProvider } from '@/contexts/SnackbarContext';
import StyledIcon from '@/components/StyledIcon';
import { useLogout } from '@/lib/logout';
import { getLucideIcon } from '@/helpers/utils';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import theme from '@/theme/theme';

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
  isDesktop?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'disableTransition' && prop !== 'isDesktop',
})<AppBarProps & { disableTransition?: boolean }>(({ theme, open, disableTransition, isDesktop }) => ({
  border: 0,
  borderBottom: '1px solid ' + theme.palette.divider,
  marginLeft: open ? drawerWidth : (isDesktop ? drawerMiniWidth : 0),
  width: open ? `calc(100% - ${drawerWidth}px)` : (isDesktop ? `calc(100% - ${drawerMiniWidth}px)` : '100%' ),
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 1,
  transition: disableTransition ? 'none' : theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open 
      ? theme.transitions.duration.enteringScreen 
      : theme.transitions.duration.leavingScreen,
  }),
}));

const drawerMixin = (theme: Theme, open: boolean, disableTransition = false, isDesktop = true): CSSObject => ({
  width: open ? drawerWidth : (isDesktop ? `calc(${theme.spacing(8)} + 1px)` : 0),
  height: '100%',
  transition: disableTransition ? 'none' : theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: open 
      ? theme.transitions.duration.enteringScreen 
      : theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  zIndex: theme.zIndex.drawer,
  top: 0,
});

const Drawer = styled(MuiDrawer, { 
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'disableTransition' && prop !== 'isDesktop'
})<{ open?: boolean; disableTransition?: boolean; isDesktop?: boolean }>(
  ({ theme, open = false, disableTransition, isDesktop = true }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...drawerMixin(theme, open, disableTransition, isDesktop),
    '& .MuiDrawer-paper': drawerMixin(theme, open, disableTransition, isDesktop),
  }),
);

// Add this styled component with the other styled components
const Overlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'show'
})<{ show: boolean }>(({ show }) => ({
  display: show ? 'block' : 'none',
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
  const isDesktop = useBreakpoint('desktop');

  const user = session?.user;
  const username = user?.name;
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
            isDesktop={isDesktop}
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
                { t('common.logout') }
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer 
          variant="permanent" 
          open={drawerOpen}
          disableTransition={isInitialMount}
          isDesktop={isDesktop}
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
                  Array.isArray(serviceList) && serviceList.map((service: any, index: number) => (
                    <NavigationListItem
                      key={index}
                      level={2}
                      icon={getLucideIcon(service.icon)}
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
        {/* Overlay component */}
        <Overlay 
          show={!isDesktop && drawerOpen}
          onClick={handleDrawerClick}
        />
        <Box component="main" sx={{ 
          width: '100%', 
          height: drawerOpen && !isDesktop ? '100vh' : 'auto',
          position: drawerOpen && !isDesktop ? 'absolute': 'relative',
          overflowY: drawerOpen && !isDesktop ? 'hidden' : 'auto',
        }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </div>
    </SnackbarProvider>
  );
}