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
import { AccountBalanceOutlined, ApartmentOutlined } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { DropdownListItem, NavigationListItem } from '@/components/NavigationComponents';
import { useLanguage, useTranslations, localeLabels, type Locale } from '@/contexts/LanguageContext';

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
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDrawerClick = () => {
    setDrawerOpen(!drawerOpen);
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

  // Check if path is active
  const isPathActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
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
              isActive={isPathActive('/')}
              isDrawerOpen={drawerOpen}
              onClick={handleNavigation}
            />
            
            {/* Services Dropdown */}
            <DropdownListItem
              icon={<ApartmentOutlined />}
              primary={t('nav.services')}
              // isActive={pathname.includes('/services')}
              isDrawerOpen={drawerOpen}
            >
              <NavigationListItem
                level={2}
                icon={<AccountBalanceOutlined />}
                primary={t('nav.govConnect')}
                path="/services/gov-connect"
                isActive={isPathActive('/services/gov-connect')}
                isDrawerOpen={drawerOpen}
                onClick={handleNavigation}
              />
              
              <NavigationListItem
                level={2}
                icon={<ApartmentOutlined />}
                primary={t('nav.bizConnect')}
                path="/services/biz-connect"
                isActive={isPathActive('/services/biz-connect')}
                isComingSoon={true}
                isDrawerOpen={drawerOpen}
                onClick={handleNavigation}
              />
              
              <NavigationListItem
                level={2}
                icon={<AccountBalanceOutlined />}
                primary={t('nav.payConnect')}
                path="/services/pay-connect"
                isActive={isPathActive('/services/pay-connect')}
                isDrawerOpen={drawerOpen}
                onClick={handleNavigation}
              />
            </DropdownListItem>
          </List>
          <Divider />
          <List>
           
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