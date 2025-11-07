'use client';

import React from "react";
import InlineTag from "@/components/InlineTag";
import Spacer from "@/components/ui/Spacer";
import { Box, Button, Card, Grid, Input, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { CircleCheckBig, Download, Eye, Monitor, Search, Shield, Smartphone, Star, Wifi } from "lucide-react";
import { TabList, Tab, TabPanel } from "@/components/ui/StyledTabs";
import StyledIcon from "@/components/StyledIcon";
import FormField from "@/components/form/FormField";
import theme from "@/theme/theme";

const TGuardMobileAppFeature = [
  {
    icon: <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />,
    title: "Real-time Protection",
    description: "Advanced threat detection",
  },
  {
    icon: <Monitor className="h-8 w-8 text-blue-600 mx-auto mb-2" />,
    title: "App Scanning",
    description: "Malware analysis",
  },
  {
    icon: <Wifi className="h-8 w-8 text-blue-600 mx-auto mb-2" />,
    title: "WiFi Security",
    description: "Public network protection",
  },
  {
    icon: <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />,
    title: "Privacy Monitor",
    description: "Permission tracking",
  },
];

const PROTECTION_FEATURES = [
  'Real-time breach monitoring',
  'Identity theft alerts',
  'Password security recommendations',
  'Corporate domain monitoring',
];

export default function SafeConnectClient() {
  const [value, setValue] = React.useState('1');
  const [darkWebEmail, setDarkWebEmail] = React.useState('');

  const handleDarkWebCheck = () => {
    // [TODO]: Implement dark web monitoring logic here
    alert(`Checking dark web for breaches related to: ${darkWebEmail}`);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }
  return (
    <Box component="div" className="relative">
      <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">SafeConnect</Typography>
      <Typography variant="body2" component="p">Comprehensive cybersecurity tools and services for individuals and corporations</Typography>
      <InlineTag label="Services Available" className="absolute top-4 right-4" startIcon={<CircleCheckBig />} variant="green" />
      <Spacer height={20} />
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Cybersecurity for Individuals" value="1" disableRipple />
            <Tab label="Cybersecurity for Corporates" value="2" disableRipple />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
                <InlineTag 
                  className="font-bold! text-only text-base!"
                  label="T Guard Mobile App"
                  variant="transparent"
                  startIcon={<Smartphone />}
                />
                <Typography variant="body2" component="p">Personal cybersecurity protection for your mobile devices with real-time threat monitoring</Typography>
                <Spacer height={20} />
                <Paper
                  className="p-6 bg-linear-to-r from-blue-50 to-green-50"
                  variant="outlined"
                >
                  <Box className="flex items-center">
                    <StyledIcon 
                      icon={<Shield size={32} />} 
                      variant="custom"
                      textColor="#43A047"
                      bgColor="white"
                      size={64}
                      square
                      className="mr-3"
                    />
                    <Box component="div">
                      <Typography variant="body1" component="h4" sx={{ fontWeight: 700 }}>T-Guard Mobile Security</Typography>
                      <Typography variant="caption" component="p">Comprehensive mobile security with real-time threat protection</Typography>
                      <Box component="div" className="flex gap-4 mt-3">
                        <InlineTag label="Free Download" variant="green" />
                        <Box component="div" className="flex">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                          <span className="text-sm text-muted-foreground">(12,847)</span>
                        </Box>  
                      </Box>
                    </Box>
                  </Box>
                  <Spacer height={20} />
                  <Button variant="gradient" color="blue" startIcon={<Download size={16} />} sx={{ width: "100%" }} onClick={() => window.open("https://play.google.com/store/apps/details?id=com.tradelinkapps.ekycrass&hl=en", "_blank")}>Download from Google Play</Button>
                </Paper>
                <Spacer height={20} />
                <Box component="div" className="grid grid-cols-2 gap-3">
                  {TGuardMobileAppFeature.map((feature, index) => (
                    <Box key={index} component="div" className="text-center p-3 bg-gray-50 rounded-lg">
                      {feature.icon}
                      <Box component="div" className="font-medium text-sm mb-1">{feature.title}</Box>
                      <Box component="div" className="text-xs text-muted-foreground">{feature.description}</Box>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                <InlineTag 
                  className="font-bold! text-only text-base!"
                  label="Dark Web Monitoring"
                  variant="transparent"
                  startIcon={<Eye />}
                />
                <Typography variant="body2" component="p">Check if your email or company data has been compromised in data breaches</Typography>
                <Spacer height={20} />
                  <Typography variant="body1" component="h4" className="font-bold! mb-3">Email Breach Check</Typography>
                  <div className="space-y-2">
                    <FormField
                      name="darkWebEmail"
                      value={darkWebEmail}
                      placeholder="Enter email address to check for breaches"
                      onChange={(name, value) => setDarkWebEmail(value)}
                      onBlur={() => {}}
                      size="small"
                    />
                    <Button variant="gradient" color="blue" startIcon={<Search size={16} />} sx={{ width: "100%", mt: 1 }} onClick={handleDarkWebCheck} disabled={!darkWebEmail.trim()}>Check Now</Button>
                  </div>
                  <Typography variant="caption" component="p" sx={{ mt: 1 }}>We'll search across known data breach databases to check if your email has been compromised.</Typography>
                  <Spacer height={20} />
                  <Card 
                    variant="outlined" 
                    className="p-4 bg-blue-50! border-2! border-blue-200!"
                  >
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: theme.palette.text.darkBlue, mb: 1 }}>Eligibility Requirements</Typography>
                    <List sx={{ color: theme.palette.text.blue, fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
                      {PROTECTION_FEATURES.map((features, i) => (
                        <ListItem key={`features-${i}`} sx={{ py: 0 }}>
                          <ListItemText primary={features} />
                        </ListItem>
                      ))}
                    </List>
                  </Card>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">

        </TabPanel>
      </TabContext>
    </Box>
  )
}