"use client";

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Menu, MenuItem } from '@mui/material';
import Logo from '@/assets/svg/Logo';
import { AccountBalanceOutlined, ApartmentOutlined, CreditCardOutlined, CreditCardRounded, EditNoteOutlined, HelpOutlineOutlined, SettingsOutlined, ShieldOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { DropdownListItem, NavigationListItem } from '@/components/NavigationComponents';
import { useLanguage, useTranslations, useDrawer, localeLabels, type Locale } from '@/contexts/AppContext';
import path from 'path';

const drawerWidth = 240;
const drawerMiniWidth = 64;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  border: 0,
  borderBottom: '1px solid ' + theme.palette.divider,
  marginLeft: open ? drawerWidth : drawerMiniWidth,
  width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${drawerMiniWidth}px)`,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open 
      ? theme.transitions.duration.enteringScreen 
      : theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
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
  const theme = useTheme();
  const router = useRouter();
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const { drawerOpen, toggleDrawer } = useDrawer();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  interface serviceListType {
    icon: React.ReactNode;
    label: string;
    path: string;
    coming_soon?: boolean;
  }

  const serviceList = [
    {
      icon: <EditNoteOutlined />,
      label: t('nav.signConnect'),
      path: '/services/sign-connect'
    },
    {
      icon: <ApartmentOutlined />,
      label: t('nav.bizConnect'),
      path: '/services/biz-connect',
      coming_soon: true
    },
    { 
      icon: <CreditCardOutlined />, 
      label: t('nav.payConnect'),
      path: '/services/pay-connect'
    },
    {
      icon: <AccountBalanceOutlined />,
      label: t('nav.govConnect'),
      path: '/services/gov-connect'
    },
    {
      icon: <ShieldOutlined />,
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

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    handleClose();
  };

  // Navigation handler
  const handleNavigation = (path: string) => {
    router.push(path);
  };

 

  return (
    <div className="app-layout min-h-screen">
      <Box className="flex">
        <AppBar 
          position="fixed"
          color="transparent"
          elevation={0}
          open={drawerOpen}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              onClick={handleDrawerClick}
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <div className="grow" />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <LanguageIcon />
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
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={drawerOpen}>
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
              icon={<HomeOutlinedIcon />}
              primary={t('nav.dashboard')}
              path="/"
              onClick={handleNavigation}
            />
            
            {/* Services Dropdown */}
            <DropdownListItem
              icon={<ApartmentOutlined />}
              primary={t('nav.services')}
            >
              { 
                serviceList.map((service: serviceListType) => (
                  <NavigationListItem
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
              icon={<ShoppingCartOutlined />}
              primary={t('nav.subscriptions')}
              path="/subscriptions"
              onClick={handleNavigation}
            />
            
            {/* Settings Navigation */}
            <NavigationListItem
              level={1}
              icon={<SettingsOutlined />}
              primary={t('nav.settings')}
              path="/settings"
              onClick={handleNavigation}
            />

            {/* Help Centre Navigation */}
            <NavigationListItem
              level={1}
              icon={<HelpOutlineOutlined />}
              primary={t('nav.helpCentre')}
              path="/help-centre"
              onClick={handleNavigation}
            />
            
          </List>
        </Drawer>
        <Box component="main">
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </div>
  );
}