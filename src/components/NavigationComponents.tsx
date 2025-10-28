"use client";

import * as React from 'react';
import { usePathname } from 'next/navigation';

// MUI Components
import { styled } from '@mui/material/styles';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';

// MUI Icons
import { ChevronDown, ChevronUp } from 'lucide-react';

// Local Components & Contexts
import { useTranslations, useDrawer } from '@/contexts/AppContext';
import InlineTag from './InlineTag';

// Styled ListItemButton with active state support
const ListItemIcon = styled(MuiListItemIcon)(() => ({
    minWidth: 'auto',
    width: '20px',
    color: 'black'
}));

const ListItemButton = styled(MuiListItemButton)<{ isActive?: boolean, isDrawerOpen?: boolean }>(({ theme, isActive, isDrawerOpen }) => ({
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    // Level 2 base styles
    '&.lv2': {
        paddingLeft: theme.spacing(2),
        borderLeft: isDrawerOpen ? `1px solid ${theme.palette.divider}` : 0,
        marginLeft: isDrawerOpen ? theme.spacing(2) : 0,
    },
    
    // Button wrapper styles
    '& .real-btn': {
        width: '100%',
        padding: theme.spacing(0.5, 1),
        background: isActive ? theme.palette.gradient.primary : 'transparent',
        color: isActive ? theme.palette.primary.contrastText : 'inherit',
        borderRadius: isActive ? theme.shape.borderRadius : 0,
    },
    
    // Tag styles
    '& .tag': {
        background: theme.palette.gradient.secondary,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(0, 0.5),
        fontSize: '0.75rem',
        fontWeight: 500,
        color: theme.palette.primary.contrastText,
    },
    
    // Icon styles
    '& .MuiListItemIcon-root': {
        marginRight: isDrawerOpen ? theme.spacing(1) : 0,
        color: (isActive) ? theme.palette.primary.contrastText : 'black',
    },
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
      <ListItemButton 
        onClick={handleClick} 
        isActive={isActive}
        isDrawerOpen={isDrawerOpen}
      >
        <div className="flex justify-center real-btn">
            <ListItemIcon>{icon}</ListItemIcon>
            { 
                isDrawerOpen &&
                <>
                    <ListItemText primary={primary} />
                    {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </> 
            }
        </div>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}

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
        className={`lv${level}`}
        isActive={isPathActive}
        isDrawerOpen={isDrawerOpen}
        onClick={() => onClick?.(path)}
    >
        <div className="flex justify-center real-btn">
            <ListItemIcon>{icon}</ListItemIcon>
            { isDrawerOpen && <ListItemText primary={displayText} /> }
        </div>
    </ListItemButton>
  );
}