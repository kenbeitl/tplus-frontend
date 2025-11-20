'use client';

import { styled, Tab as MuiTab } from "@mui/material";
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

export const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 32,
  padding: 0,
  flexGrow: 1,
  color: '#000000',
  fontSize: 14,
  fontWeight: 600,
  textTransform: 'none',  
  
  '&.Mui-selected': {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: '5rem',
    borderBottom: 0,
  },
}));

export const TabPanel = styled(MuiTabPanel)(({ theme }) => ({
    paddingLeft: 0,
    paddingRight: 0,    
}));