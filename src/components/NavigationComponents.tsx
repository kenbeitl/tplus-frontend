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
import Tag from './Tag';

// Styled ListItemButton with active state support
const ListItemIcon = styled(MuiListItemIcon)(() => ({
    minWidth: 'auto',
    width: '20px',
    color: 'black'
}));

const ListItemButton = styled(MuiListItemButton, {
    shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isDrawerOpen',
})<{ isActive?: boolean, isDrawerOpen?: boolean }>(({ theme, isActive, isDrawerOpen }) => ({
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
        background: isActive ? theme.palette.gradient.blue : 'transparent',
        color: isActive ? theme.palette.primary.contrastText : 'inherit',
        borderRadius: isActive ? theme.shape.borderRadius : 0,
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
  storageKey?: string; // Add stable key prop
}

export function DropdownListItem({ 
  icon, 
  primary, 
  children, 
  isActive = false,
  defaultOpen = false,
  storageKey: propStorageKey
}: DropdownListItemProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [mounted, setMounted] = React.useState(false);
  const isDrawerOpen = useDrawer().drawerOpen;

  // Use provided storageKey or fallback to primary-based key
  const storageKey = propStorageKey || `dropdown_${primary.replace(/\s+/g, '_').toLowerCase()}`;

  // Ensure client-side hydration and load saved state
  React.useEffect(() => {
    setMounted(true);
    
    // Load saved dropdown state from localStorage
    const savedState = localStorage.getItem(storageKey);
    if (savedState !== null) {
      setOpen(savedState === 'true');
    }
  }, [storageKey]);

  // Save dropdown state to localStorage when it changes
  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem(storageKey, open.toString());
    }
  }, [open, mounted, storageKey]);

  const handleClick = () => {
    setOpen(!open);
  };

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <ListItemButton 
        onClick={handleClick} 
        isActive={isActive}
        isDrawerOpen={false} // Use consistent initial state
      >
        <div className="flex justify-center items-center real-btn">
          <ListItemIcon>{icon}</ListItemIcon>
        </div>
      </ListItemButton>
    );
  }

  return (
    <>
      <ListItemButton 
        onClick={handleClick} 
        isActive={isActive}
        isDrawerOpen={isDrawerOpen}
      >
        <div className="flex justify-center items-center real-btn">
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
  const [mounted, setMounted] = React.useState(false);
  const isDrawerOpen = useDrawer().drawerOpen;
  
  // Ensure client-side hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const isPathActive = React.useMemo(() => {
    if (!mounted) return false; // Prevent hydration mismatch
    return pathname === path || pathname.startsWith(path + '/');
  }, [pathname, path, mounted]);
  
  const displayText = React.useMemo(() => {
    if (!mounted) return primary; // Consistent initial render
    return isComingSoon ? (
      <>
        {primary} <Tag variant="orange" label={t('common.comingSoon')} />
      </>
    ) : primary;
  }, [primary, isComingSoon, t, mounted]);
  
  // Prevent hydration mismatch by using consistent initial state
  if (!mounted) {
    return (
      <ListItemButton
          className={`lv${level}`}
          isActive={false} // Use consistent initial state
          isDrawerOpen={false} // Use consistent initial state
          onClick={() => onClick?.(path)}
      >
          <div className="flex justify-center items-center real-btn">
              <ListItemIcon>{icon}</ListItemIcon>
          </div>
      </ListItemButton>
    );
  }
  
  return (
    <ListItemButton
        className={`lv${level}`}
        isActive={isPathActive}
        isDrawerOpen={isDrawerOpen}
        onClick={() => onClick?.(path)}
    >
        <div className="flex justify-center items-center real-btn">
            <ListItemIcon>{icon}</ListItemIcon>
            { isDrawerOpen && <ListItemText primary={displayText} /> }
        </div>
    </ListItemButton>
  );
}