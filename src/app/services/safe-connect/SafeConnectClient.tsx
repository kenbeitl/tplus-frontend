'use client';

import React from "react";
import { Tag, Spacer, TabList, Tab, TabPanel, StyledIcon, FormField, ButtonWithFormModal } from "@/components";
import { Badge, Box, Button, Card, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemText, Paper, Switch, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { AlertTriangle, CircleCheckBig, Download, ExternalLink, Eye, Mail, Monitor, Search, Shield, ShieldAlert, Smartphone, Star, Users, Wifi } from "lucide-react";
import theme from "@/theme/theme";
import { useTranslations } from '@/contexts/AppContext';

const WEB_VULNERABILITY_ASSESSMENT_TEMPLATE_ID = 'safeconnect-web-vulnerability-assessment';
const NETWORK_BOX_CYBERSECURITY_TEMPLATE_ID = 'safeconnect-network-box-cybersecurity';

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

const KEY_FEATURES = [
  "24/7 SOC Monitoring",
  "Managed Firewall",
  "Intrusion Prevention",
  "Threat Intelligence",
  "Email Security",
  "Web Filtering",
]

const REASONS_FOR_TPLUS_SECURITY_PARTNERS = [
  "Vetted and certified security professionals",
  "24/7 support and monitoring available",
  "Competitive pricing with transparent costs",
  "Local expertise with global standards",
  "Seamless integration with T+ platform",
  "Compliance with Hong Kong regulations",
]

export default function SafeConnectClient() {
  const t = useTranslations();
  const [value, setValue] = React.useState('1');
  const [darkWebEmail, setDarkWebEmail] = React.useState('');
  const [darkWebResult, setDarkWebResult] = React.useState<any>({
    found: false,
  });

  const handleDarkWebCheck = () => {
    // Mock dark web monitoring result
    const mockLeaks = [
      { source: 'Elance.com', date: '2019-01' },
      { source: '7k7k.com', date: '2020-03' },
      { source: 'DataBreachSite.com', date: '2021-08' },
      { source: 'BusinessNetwork.net', date: '2022-12' }
    ];
    
    setDarkWebResult({
      email: darkWebEmail,
      atRisk: mockLeaks.length > 0,
      leaks: mockLeaks,
      found: false,
      breaches: mockLeaks.map(leak => ({
        name: leak.source,
        date: leak.date,
        compromisedData: ['Email', 'Password']
      })),
      message: mockLeaks.length > 0 
        ? `Your email was found in ${mockLeaks.length} data breaches.` 
        : 'No breaches found for your email.'
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }

  return (
    <Box component="div" className="relative">
      <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.safeConnect.title") }</Typography>
      <Typography variant="body2" component="p">{ t("pages.safeConnect.context") }</Typography>
      <Tag label="Services Available" className="absolute top-4 right-4" startIcon={<CircleCheckBig />} variant="green" />
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
                <Tag 
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
                      textcolor={theme.palette.icon.green}
                      bgColor="white"
                      size={64}
                      square
                      className="mr-3"
                    />
                    <Box component="div">
                      <Typography variant="body1" component="h4" sx={{ fontWeight: 700 }}>T-Guard Mobile Security</Typography>
                      <Typography variant="caption" component="p">Comprehensive mobile security with real-time threat protection</Typography>
                      <Box component="div" className="flex gap-4 mt-3">
                        <Tag label="Free Download" variant="green" />
                        <Box component="div" className="flex">
                          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
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
                      <Box component="div" className="text-xs text-muted-foreground text-gray-400">{feature.description}</Box>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ px: 3, pt: 3, pb: 6, height: '100%' }}>
                <Tag 
                  className="font-bold! text-only text-base!"
                  label="Dark Web Monitoring"
                  variant="transparent"
                  startIcon={<Eye />}
                />
                <Typography variant="body2" component="p">Check if your email or company data has been compromised in data breaches</Typography>
                <Spacer height={20} />
                  <Box component="div" className="flex justify-between items-center">
                    <Typography variant="body1" component="h4" className="font-bold! mb-3">Email Breach Check</Typography>
                    <FormGroup>
                      <FormControlLabel 
                        control={
                          <Switch 
                            checked={darkWebResult.found}
                            onChange={() => setDarkWebResult({...darkWebResult, found: !darkWebResult.found})} 
                          />
                        } 
                        label={`Set Dark Web Result to ${(!darkWebResult?.found).toString()}`} 
                      />
                    </FormGroup>
                  </Box>
                  <div className="space-y-2">
                    <FormField
                      name="darkWebEmail"
                      value={darkWebEmail}
                      placeholder="Enter email address to check for breaches"
                      onChange={(name, value) => setDarkWebEmail(value)}
                      onBlur={() => {}}
                      size="small"
                    />
                    <Button variant="gradient" color="blue" startIcon={<Search size={16} />} sx={{ width: "100%", mt: 1 }} onClick={handleDarkWebCheck} disabled={!darkWebEmail || !darkWebEmail.includes('@')}>Check Now</Button>
                  </div>
                  <Typography variant="caption" component="p" sx={{ mt: 1 }}>We'll search across known data breach databases to check if your email has been compromised.</Typography>
                  <Spacer height={20} />
                  {darkWebResult && (
                    <>
                      <div className={`p-4 rounded-lg border ${
                        darkWebResult.found 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-start space-x-3">
                          {darkWebResult.found ? (
                            <AlertTriangle size={20} className="text-red-600 mt-0.5" />
                          ) : (
                            <CircleCheckBig size={20} className="text-green-600 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              darkWebResult.found ? 'text-red-900' : 'text-green-900'
                            }`}>
                              {darkWebResult.found ? 'Breaches Found' : 'No Breaches Found'}
                            </h4>
                            <p className={`text-sm mt-1 ${
                              darkWebResult.found ? 'text-red-700' : 'text-green-700'
                            }`}>
                              {darkWebResult.message}
                            </p>
                            {darkWebResult.found && darkWebResult.breaches && (
                              <div className="mt-3 space-y-2">
                                {darkWebResult.breaches.map((breach: any, index: number) => (
                                  <div key={index} className="bg-white p-3 rounded border">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium text-sm">{breach.name}</p>
                                        <p className="text-xs text-muted-foreground">{breach.date}</p>
                                      </div>
                                      <Badge badgeContent={breach.compromisedData.length} color="error">
                                        <ShieldAlert />
                                      </Badge>
                                    </div>
                                    <p className="text-xs mt-2 text-muted-foreground">
                                      Compromised: {breach.compromisedData.join(', ')}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Spacer height={20} />
                    </>
                  )}
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
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
                <Tag 
                  className="font-bold! text-only text-base!"
                  label="Web Vulnerability Assessment"
                  variant="transparent"
                  startIcon={<Search />}
                />
                <Typography variant="body2" component="p">Comprehensive website security scanning and vulnerability detection with detailed reporting</Typography>
                <Spacer height={20} />
                <Card variant="outlined" className="p-3 bg-green-50! border-green-200!">
                  <Tag 
                    className="font-bold! text-only text-base!"
                    label="Free Annual Assessment Available"
                    variant="transparent"
                    startIcon={<CircleCheckBig />}
                  />
                  <Typography variant="caption" component="p">Get one comprehensive vulnerability assessment per year at no cost. Additional assessments available for purchase at competitive rates.</Typography>
                </Card>
                <Spacer height={20} />
                <Box component="div" className="flex items-center justify-between mb-3">
                  <Typography variant="body1" component="h4" className="font-bold!">Request New Assessment</Typography>
                  <Tag
                    variant="green" 
                    className="text-xs!"
                    label="Free Annual Quota Available"
                  />
                </Box>
                <ButtonWithFormModal
                  templateId={WEB_VULNERABILITY_ASSESSMENT_TEMPLATE_ID} 
                  buttonStartIcon={<Search size={20} />}
                  buttonText="Request Free Assessment"
                />
                <Spacer height={40} />
                <Card variant="outlined" className="p-5 bg-blue-50! border-blue-200!">
                  <Box component="div" className="flex">
                    <Mail size={24} className="text-blue-600 mr-3 shrink-0" />
                    <Box>
                      <Typography variant="subtitle1" component="p" color={theme.palette.text.darkBlue} sx={{ fontWeight: 700 }}>Assessment Reports Delivered via Email</Typography>
                      <Typography variant="caption" component="p" color={theme.palette.text.blue}>All web vulnerability assessment reports will be sent directly to your registered email address upon completion. Reports are not stored in the T+ platform for security and privacy reasons.<br/><br/>Please check your email inbox (and spam folder) for assessment reports after requesting a scan.</Typography>
                    </Box>
                  </Box>
                </Card>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
                <Tag 
                  className="font-bold! text-only text-base!"
                  label="Consulting Services"
                  variant="transparent"
                  startIcon={<Users />}
                />
                <Typography variant="body2" component="p">Professional cybersecurity services and solutions from trusted partners</Typography>
                <Spacer height={20} />
                <Card variant="outlined" className="px-5 py-7 card-hover">
                    <Box component="div" className="flex items-center justify-around mb-3">
                      <Typography variant="body1" component="h4" className="font-bold!">Network Box Managed Security Services for SMEs</Typography>
                      <Tag
                        variant="white" 
                        className="text-xs! mx-2"
                        label="Managed Security"
                      />
                      <Box component="div" className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </Box>
                    </Box>
                    <Typography variant="caption" component="p" sx={{ mb: 3 }}>Comprehensive managed security services providing 24/7 SOC monitoring, managed firewall, and threat intelligence specifically designed for small and medium enterprises.</Typography>
                    <Typography variant="subtitle1" component="p" sx={{ fontWeight: 700 }}>Provider:</Typography>
                    <Typography variant="body2" component="p" sx={{ mb: 3 }}>Network Box</Typography>
                    <Typography variant="subtitle1" component="p" sx={{ fontWeight: 700 }}>Starting at:</Typography>
                    <Typography variant="body2" component="p" sx={{ mb: 3 }}>From $800/month</Typography>
                    <Box component="div" className="flex justify-end mb-2">
                      <ButtonWithFormModal
                        buttonProps={{
                          sx:{ width: 'auto' }
                        }}                        
                        templateId={NETWORK_BOX_CYBERSECURITY_TEMPLATE_ID}
                        buttonText="Learn More"
                        buttonStartIcon={<ExternalLink size={16} />}
                      />
                    </Box>
                    <Typography variant="subtitle1" component="p" sx={{ fontWeight: 700, mb: 1 }}>Key Features & Capabilities:</Typography>
                    <Box component="div" className="flex flex-wrap gap-2 mb-2">
                      {KEY_FEATURES.map((feature, index) => (
                        <Box component="div" key={`feature-${index}`}>
                          <Tag 
                            className="h-6 w-auto!"
                            variant="blue"
                            label={feature}
                          />
                        </Box>
                      ))}
                    </Box>
                </Card>
                <Spacer height={20} />
                <Card variant="outlined" className="p-5 bg-blue-50! border-blue-200!">
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: theme.palette.text.darkBlue, mb: 1 }}>Why Choose T+ Security Partners?</Typography>
                  <List sx={{ color: theme.palette.text.darkBlue, fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
                    {REASONS_FOR_TPLUS_SECURITY_PARTNERS.map((reason, i) => (
                      <ListItem key={`reason-${i}`} sx={{ py: 0 }}>
                        <ListItemText primary={reason} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Card>
            </Grid>
          </Grid>     
        </TabPanel>
      </TabContext>
    </Box>
  )
}