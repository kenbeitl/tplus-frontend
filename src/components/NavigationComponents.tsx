"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material';

// Styled ListItemButton with active state support
const ListItemButton = styled(MuiListItemButton)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
  ...(isActive && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

// Reusable Dropdown List Item Component
interface DropdownListItemProps {
  icon: React.ReactNode;
  primary: string;
  children: React.ReactNode;
  isActive?: boolean;
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

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} isActive={isActive}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
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
  onClick?: (path: string) => void;
  sx?: any;
}

export function NavigationListItem({ 
  icon, 
  primary, 
  path, 
  isActive = false, 
  onClick,
  sx 
}: NavigationListItemProps) {
  return (
    <ListItemButton
      isActive={isActive}
      onClick={() => onClick?.(path)}
      sx={sx}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}