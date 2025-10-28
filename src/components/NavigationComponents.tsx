"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { useTranslations, useDrawer } from '@/contexts/AppContext';
import InlineTag from './InlineTag';
import { usePathname } from 'next/navigation';

// Styled ListItemButton with active state support
const ListItemIcon = styled(MuiListItemIcon)(() => ({
    minWidth: 'auto',
    marginRight: '8px'
}));

const ListItemButton = styled(MuiListItemButton)<{ isActive?: boolean }>(({ theme, isActive }) => ({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
 
    '&.Mui-selected, &.Mui-selected:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    '& .tag': {
        background: theme.palette.gradient.secondary,
        borderRadius: theme.shape.borderRadius,
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        fontSize: '0.75rem',
        fontWeight: 500,
        color: theme.palette.primary.contrastText,
    },

    ...(isActive && {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        background: theme.palette.gradient.primary,
        color: theme.palette.primary.contrastText,

        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.contrastText,
            borderRadius: theme.shape.borderRadius,
        },   
       
    }),
}));

 

// Reusable Dropdown List Item Component
interface DropdownListItemProps {
  icon: React.ReactNode;
  primary: string;
  children: React.ReactNode;
  isActive?: boolean;
  isDrawerOpen?: boolean;
  defaultOpen?: boolean;
}

export function DropdownListItem({ 
  icon, 
  primary, 
  children, 
  isActive = false,
  defaultOpen = false 
}: DropdownListItemProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const isDrawerOpen = useDrawer().drawerOpen;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} isActive={isActive}>
        <ListItemIcon>{icon}</ListItemIcon>
        { 
            isDrawerOpen &&
            <>
                <ListItemText primary={primary} />
                {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
            </> 
        }
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}

// Simple Navigation List Item Component
interface NavigationListItemProps {
  icon: React.ReactNode;
  primary: string;
  path: string;
  isActive?: boolean;
  isComingSoon?: boolean;
  level?: number;
  onClick?: (path: string) => void;
  sx?: any;
}

export function NavigationListItem({ 
  icon, 
  primary, 
  path, 
  isComingSoon = false,
  level = 1,
  onClick,
}: NavigationListItemProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const isDrawerOpen = useDrawer().drawerOpen;
  
  const isPathActive = React.useMemo(() => {
    return pathname === path || pathname.startsWith(path + '/');
  }, [pathname, path]);
  
  const displayText = React.useMemo(() => {
    return isComingSoon ? (
      <>
        {primary} <InlineTag label={t('common.comingSoon')} />
      </>
    ) : primary;
  }, [primary, isComingSoon, t]);
  
  return (
    <ListItemButton
      isActive={isPathActive}
      onClick={() => onClick?.(path)}
      sx={{ pl: level === 2 && isDrawerOpen === true ? 4 : 2 }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      { isDrawerOpen && <ListItemText primary={displayText} /> }
    </ListItemButton>
  );
}