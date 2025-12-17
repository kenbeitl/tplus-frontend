'use client';

import { styled } from "@mui/material";
import MuiTabList from '@mui/lab/TabList';
import MuiTabPanel from '@mui/lab/TabPanel';

export const TabList = styled(MuiTabList)(({ theme }) => ({
  minHeight: 32,
  backgroundColor: '#f5f5f5',
  width: '100%',
  borderRadius: '5rem',
  padding: '.25rem',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

export const TabPanel = styled(MuiTabPanel)(({ theme }) => ({
    paddingLeft: 0,
    paddingRight: 0,    
}));