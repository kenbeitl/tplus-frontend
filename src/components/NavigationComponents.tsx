"use client";

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, Collapse, List, ListItemText, ListItemButton as MuiListItemButton, ListItemIcon as MuiListItemIcon, Tooltip  } from '@mui/material';

// Local Components & Contexts
import { useDrawer } from '@/contexts/AppContext';
import { menuIconSize } from '@/helpers/constants'
import { getSVGIcon } from '@/helpers/utils';import theme from '@/theme/theme';
;

// Styled ListItemButton with active state support
export const ListItemIcon = styled(MuiListItemIcon)(() => ({
    minWidth: 'auto',
    width: menuIconSize,
    color: theme.palette.text.black
}));

export const ListItemButton = styled(MuiListItemButton, {
    shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isDrawerOpen',
})<{ isActive?: boolean, isDrawerOpen?: boolean }>(({ theme, isActive, isDrawerOpen }) => ({
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: 'transparent',
    },
    // Level 2 base styles
    '&.lv2': {
        paddingLeft: theme.spacing(2),
        borderLeft: isDrawerOpen ? `1px solid ${theme.palette.divider}` : 0,
        marginLeft: isDrawerOpen ? theme.spacing(2) : 0,
    },
    
    // Button wrapper styles
    '& .real-btn': {
        width: '100%',
        padding: isDrawerOpen ? theme.spacing(0, 1) : theme.spacing(0.75, 1),
        background: isActive ? theme.palette.gradient.blue : 'transparent',
        color: isActive ? theme.palette.primary.contrastText : 'inherit',
        borderRadius: isActive ? theme.shape.borderRadius : 0,
        transition: theme.transitions.create(['background', 'color'], {
            duration: theme.transitions.duration.short,
        }),
    },
    
    // Hover styles
    '&:hover .real-btn': {
        background: isActive ? theme.palette.gradient.blue : theme.palette.background.lightblue,
        boxShadow: isActive ? 'none' : '0px 2px 16px 2px rgba(0, 0, 0, 0.1)',
        color: isActive ? theme.palette.primary.contrastText : 'inherit',
        borderRadius: theme.shape.borderRadius,
    },
    
    '&:hover .MuiListItemIcon-root': {
        color: isActive ? theme.palette.primary.contrastText : 'black',
    },
    
    // Icon styles
    '& .MuiListItemIcon-root': {
        marginRight: isDrawerOpen ? theme.spacing(1) : 0,
        color: (isActive) ? theme.palette.primary.contrastText : 'black',
        transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
        }),
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

  // Save dropdown state to localStorage when it changes (only when drawer is open)
  React.useEffect(() => {
    if (mounted && isDrawerOpen) {
      localStorage.setItem(storageKey, open.toString());
    }
  }, [open, mounted, storageKey, isDrawerOpen]);

  // Force expand when drawer is collapsed
  React.useEffect(() => {
    if (!isDrawerOpen) {
      setOpen(true);
    }
  }, [isDrawerOpen]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      { 
        isDrawerOpen &&
        <ListItemButton 
          onClick={handleClick} 
          isActive={isActive}
          isDrawerOpen={isDrawerOpen}
        >
          <Box component="div" className="flex justify-center items-center real-btn">
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primary} />
            <Box 
              component="div"
              className="transition-transform"
              sx={{
                transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              { getSVGIcon('chevron-right', menuIconSize) }
            </Box>
          </Box>
        </ListItemButton>
      }
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
  level?: number;
  onClick?: (path: string) => void;
  sx?: any;
}

export function NavigationListItem({ 
  icon, 
  primary, 
  path,
  level = 1,
  onClick,
}: NavigationListItemProps) {
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
  
  return (
    <Tooltip 
      title={primary} 
      placement="right" 
      disableHoverListener={isDrawerOpen}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: '#ffffff',
            color: theme.palette.text.primary,
            fontSize: '1rem',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '5px 12px',
            border: '1px solid ' + theme.palette.divider,
          }
        },
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -20],
              },
            },
          ],
        },
      }}
    >
      <ListItemButton
          className={`lv${level}`}
          isActive={isPathActive}
          isDrawerOpen={isDrawerOpen}
          onClick={() => onClick?.(path)}
      >
          <Box component="div" className="flex justify-center items-center real-btn">
              <ListItemIcon>{icon}</ListItemIcon>
              { isDrawerOpen && <ListItemText primary={primary} /> }
          </Box>
      </ListItemButton>
    </Tooltip>
  );
}