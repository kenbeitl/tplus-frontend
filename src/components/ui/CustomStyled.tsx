'use client';

import { Tab as MuiTab, styled } from "@mui/material";
import MuiTabList from '@mui/lab/TabList';
import MuiTabPanel from '@mui/lab/TabPanel';

export const Tab = styled(MuiTab)(({ theme }) => ({
    transition: 'all 0.3s ease',
    '&:hover': {
        background: theme.palette.text.white,
        borderRadius: '5rem',
    },
    '&.Mui-selected': {
        color: theme.palette.text.white,
        background: theme.palette.gradient.blue
    }
}));

export const TabList = styled(MuiTabList)(({ theme }) => ({
  minHeight: 32,
  backgroundColor: '#f5f5f5',
  width: '100%',
  borderRadius: '5rem',
  padding: '.25rem',
  '& .MuiTabs-indicator': {
    display: 'none',
  }
}));

export const TabPanel = styled(MuiTabPanel)(({ theme }) => ({
    paddingLeft: 0,
    paddingRight: 0,    
}));