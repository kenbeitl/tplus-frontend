'use client';

import React from "react";

import theme from "@/theme/theme";
import { Badge, Box, Button, Card, Divider, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemText, Paper, Switch, Tab, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { Tag, Spacer, TabList, TabPanel, StyledIcon, FormField, ButtonWithFormModal, HeroSection, Carousel } from "@/components";
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon } from "@/helpers/utils";
import tGuard from "@/assets/images/tGuard";

const WEB_VULNERABILITY_ASSESSMENT_TEMPLATE_ID = 'safeconnect-web-vulnerability-assessment';
const NETWORK_BOX_CYBERSECURITY_TEMPLATE_ID = 'safeconnect-network-box-cybersecurity';

export default function SafeConnectClient() {
  const t = useTranslations();
  const [value, setValue] = React.useState('1');
  const [darkWebEmail, setDarkWebEmail] = React.useState('');
  const [darkWebResult, setDarkWebResult] = React.useState<any>({
    found: false,
  });

  const LogoComponent = tGuard

  const translations = React.useMemo(() => {
    const individuals = t('pages.safeConnect.cybersecurityForIndividuals');
    const corporates = t('pages.safeConnect.cybersecurityForCorporates');

    interface tGuardFeatureProps {
      icon: string;
      title: string;
      description: string;
    }
    
    return {
      // Individuals
      individuals,
      tGuard: individuals?.tGuard,
      tGuardApp: individuals?.tGuard?.app,
      tGuardFeatures: individuals?.tGuard?.app?.features as tGuardFeatureProps[] || [],
      darkWeb: individuals?.darkWeb,
      darkWebEligibility: individuals?.darkWeb?.eligibility,
      darkWebFeatures: individuals?.darkWeb?.eligibility?.requirements as string[] || [],
      
      // Corporates
      corporates,
      webVulnerability: corporates?.webVulnerability,
      consultingServices: corporates?.consultingServices,
      networkBoxForSMEs: corporates?.consultingServices?.networkBoxForSMEs,
      networkBoxFeatures: corporates?.consultingServices?.networkBoxForSMEs?.key?.features as string[] || [],
      whyTPlusSecurityPartners: corporates?.consultingServices?.whyTPlusSecurityPartners,
      securityPartnerReasons: corporates?.consultingServices?.whyTPlusSecurityPartners?.reasons as string[] || [],
    };
  }, [t]);

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
      <HeroSection
        title={ t("pages.safeConnect.title") }
        description={ t("pages.safeConnect.context") }
        icon={ getSVGIcon('shield', 24, '#FFFFFF') }
        colorScheme="emerald"
      />
      <Spacer height={20} />
      <Carousel slides={ t("pages.safeConnect.slides") } />
      <Divider className="!my-9" />
      <Box component="div" className="flex items-center mb-6">
        <StyledIcon 
          icon={getSVGIcon('shield', 24, '#FFFFFF')}
          variant="green-gradient"
          size={48}
          className="mr-3"
          square
        />
        <Typography variant="h1" component="h2">{ t("pages.safeConnect.ourServices") }</Typography>
      </Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label={translations.individuals.title} value="1" disableRipple />
            <Tab label={translations.corporates.title} value="2" disableRipple />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
                <Box component="div" className="flex items-center mb-3">
                  <Box component="span" className="mr-2">{ getSVGIcon('smartphone', 20) }</Box>
                  <Typography variant="h5" component="h4" className="font-bold!">{translations.tGuard.title}</Typography>
                </Box>
                <Typography variant="body1" component="p">{translations.tGuard.context}</Typography>
                <Spacer height={20} />
                <Paper
                  className={`p-6 ${theme.palette.gradientClasses.blueGreenLight}`}
                  variant="outlined"
                >
                  <Box className="flex sm:max-md:flex-col items-top">
                    <Box component="div" className="p-1 bg-white rounded-xl mr-6 flex items-center justify-center h-20 w-20 shadow-sm">
                      <LogoComponent />  
                    </Box>
                    <Box component="div">
                      <Typography variant="h4" component="h4" className="font-bold">{translations.tGuardApp.name}</Typography>
                      <Typography variant="body1" component="p">{translations.tGuardApp.description}</Typography>
                      <Box component="div" className="flex flex-col-reverse md:flex-row items-center gap-2 mt-3">
                        <Tag label={translations.tGuardApp.freeDownload} variant="green-inverted" className="px-2! py-1! text-base! font-normal!" />
                        <Box component="div" className="flex items-center gap-1">
                          { getSVGIcon('star', 16, '#EAB308', '#EAB308') }
                          <Typography variant="subtitle1" component="div" className="whitespace-nowrap">4.8 (12,847)</Typography>
                        </Box>  
                      </Box>
                    </Box>
                  </Box>
                  <Spacer height={20} />
                  <Button 
                    variant="gradient" 
                    color="blue" 
                    startIcon={ getSVGIcon('download', 16) } 
                    className="w-full" onClick={() => window.open(translations.tGuardApp.link, "_blank")}
                  >
                    {translations.tGuardApp.buttonText}
                  </Button>
                </Paper>
                <Spacer height={20} />
                <Box component="div" className="grid sm:grid-cols-2 gap-3">
                  {translations.tGuardFeatures.map((feature, index: number) => (
                    <Box key={`tg-${index}`} component="div" className="text-center p-3 bg-gray-50 rounded-lg">
                      <Box component="div" className="h-8 w-8 text-blue-600 mx-auto mb-2">
                        { getSVGIcon(feature.icon, 32) }
                      </Box>
                      <Typography component="div" variant="subtitle1" className="font-medium mb-1">{feature.title}</Typography>
                      <Typography component="div" variant="subtitle2" color="text.secondary">{feature.description}</Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
                <Box component="div" className="flex items-center mb-3">
                  <Box component="span" className="mr-2">{ getSVGIcon('eye', 20) }</Box>
                  <Typography variant="h4" component="h4" className="font-bold!">{translations.darkWeb.title}</Typography>
                </Box>
                <Typography variant="body1" component="p">{translations.darkWeb.context}</Typography>
                <Spacer height={20} />
                  <Box component="div" className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <Typography variant="body1" component="h4" className="font-bold! mb-3">{translations.darkWeb.emailBreachCheck.title}</Typography>
                    <FormGroup>
                      <FormControlLabel 
                        control={
                          <Switch 
                            checked={darkWebResult.found}
                            onChange={() => setDarkWebResult({...darkWebResult, found: !darkWebResult.found})} 
                          />
                        } 
                        label={`${translations.darkWeb.emailBreachCheck.setDarkWebResult} ${(!darkWebResult?.found).toString()}`} 
                      />
                    </FormGroup>
                  </Box>
                  <div className="space-y-2">
                    <FormField
                      name="darkWebEmail"
                      value={darkWebEmail}
                      placeholder={translations.darkWeb.emailBreachCheck.placeholder}
                      onChange={(name, value) => setDarkWebEmail(value)}
                      onBlur={() => {}}
                      size="small"
                    />
                    <Button 
                      variant="contained" 
                      color="primary" 
                      startIcon={getSVGIcon('search', 16)} 
                      className="w-full mt-4" onClick={handleDarkWebCheck} disabled={!darkWebEmail || !darkWebEmail.includes('@')}
                    >
                      {translations.darkWeb.emailBreachCheck.buttonText}
                    </Button>
                  </div>
                  <Typography variant="caption" component="p" className="mt-4">{translations.darkWeb.emailBreachCheck.remarks}</Typography>
                  <Spacer height={20} />
                  {darkWebResult && (
                    <>
                      <div className={`p-4 rounded-lg border ${
                        darkWebResult.found 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <Box component="div">
                            { 
                              getSVGIcon(
                                darkWebResult.found ? 'alert-triangle' : 'circle-check-big', 
                                20, 
                                darkWebResult.found ? '#DC2626' : '#16A34A'
                              ) 
                            }
                          </Box>
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              darkWebResult.found ? 'text-red-900' : 'text-green-900'
                            }`}>
                              {darkWebResult.found ? t('pages.safeConnect.breachFound') : t('pages.safeConnect.noBreachFound')}
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
                                        <Typography className="font-medium" variant="caption">{breach.name}</Typography>
                                        <Typography color="text.secondary" variant="caption">{breach.date}</Typography>
                                      </div>
                                      <Badge badgeContent={breach.compromisedData.length} color="error">
                                        { getSVGIcon('shield-alert') }
                                      </Badge>
                                    </div>
                                    <Typography className="mt-8" color="text.secondary" variant="caption">
                                      {`${t('pages.safeConnect.compromised')} ${breach.compromisedData.join(', ')}`}
                                    </Typography>
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
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: theme.palette.text.darkBlue, mb: 1 }}>{translations.darkWebEligibility.title}</Typography>
                    <List sx={{ color: theme.palette.text.blue, fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
                      {translations.darkWebFeatures.map((features: string, i: number) => (
                        <ListItem key={`features-${i}`} className="!py-0">
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
              <Card variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box component="div" className="flex items-center mb-3">
                  <Box component="span" className="mr-2">{ getSVGIcon('search', 16) }</Box>
                  <Typography variant="body1" component="h4" className="font-bold!">{translations.webVulnerability.title}</Typography>
                </Box>
                <Typography variant="body2" component="p">{translations.webVulnerability.context}</Typography>
                <Spacer height={20} />
                <Card variant="outlined" className="p-3 bg-green-50! border-green-200!">
                  <Box component="div" className="flex items-center mb-3">
                    <Box component="span" className="mr-2">{ getSVGIcon('circle-check-big', 16) }</Box>
                    <Typography variant="body1" component="h4" className="font-bold!">{translations.webVulnerability.freeAnnual.title}</Typography>
                  </Box>
                  <Typography variant="caption" component="p">{translations.webVulnerability.freeAnnual.body}</Typography>
                </Card>
                <Spacer height={20} />
                <Box component="div" className="flex sm:max-md:flex-col items-start md:items-center justify-between gap-2 mb-3">
                  <Typography variant="body1" component="h4" className="font-bold!">{translations.webVulnerability.newRequest.title}</Typography>
                  <Tag
                    variant="green" 
                    className="text-xs!"
                    label={translations.webVulnerability.newRequest.freeQuota}
                  />
                </Box>
                <ButtonWithFormModal
                  templateId={WEB_VULNERABILITY_ASSESSMENT_TEMPLATE_ID} 
                  buttonStartIcon={getSVGIcon('search', 20)}
                  buttonText={translations.webVulnerability.newRequest.buttonText}
                />
                <Spacer height={40} />
                <Card variant="outlined" className="p-5 bg-blue-50! border-blue-200!">
                  <Box component="div" className="flex">
                    { getSVGIcon('mail', 24, '#2563EB') }
                    <Box className="ml-6">
                      <Typography variant="subtitle1" component="p" color={theme.palette.text.darkBlue} sx={{ fontWeight: 700 }}>
                        {translations.webVulnerability.reportsViaEmail.title}
                      </Typography>
                      <Typography variant="caption" component="p" color={theme.palette.text.blue}>
                        {translations.webVulnerability.reportsViaEmail.line1}<br/><br/>
                        {translations.webVulnerability.reportsViaEmail.line2}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box component="div" className="flex items-center mb-3">
                  <Box component="span" className="mr-2">{ getSVGIcon('users', 16) }</Box>
                  <Typography variant="body1" component="h4" className="font-bold!">{translations.consultingServices.title}</Typography>
                </Box>
                <Typography variant="body2" component="p">{translations.consultingServices.context}</Typography>
                <Spacer height={20} />
                <Card variant="outlined" className="px-5 py-7 card-hover">
                    <Box component="div" className="flex flex-row flex-wrap items-center gap-2 mb-3">
                      <Typography variant="body1" component="h4" className="font-bold!">{translations.networkBoxForSMEs.title}</Typography>
                      <Box component="div" className="flex flex-row items-center gap-2">
                        <Tag
                          variant="white" 
                          className="text-xs!"
                          label={translations.networkBoxForSMEs.tag}
                        />
                        <Box component="div" className="flex items-center">
                          { getSVGIcon('star', 16, '#EAB308') }
                          <Typography component="span" variant="caption" className="font-medium">4.8</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="caption" component="p" className="mb-12">{translations.networkBoxForSMEs.body}</Typography>
                    <Typography variant="subtitle1" component="p" className="font-bold">{translations.networkBoxForSMEs.provider.title}</Typography>
                    <Typography variant="body2" component="p" className="mb-12">{translations.networkBoxForSMEs.provider.name}</Typography>
                    <Typography variant="subtitle1" component="p" className="font-bold">{translations.networkBoxForSMEs.startingAt.title}</Typography>
                    <Typography variant="body2" component="p" className="mb-12">{translations.networkBoxForSMEs.startingAt.price}</Typography>
                    <Box component="div" className="flex justify-end mb-2">
                      <ButtonWithFormModal
                        buttonProps={{
                          sx:{ width: 'auto' }
                        }}                        
                        templateId={NETWORK_BOX_CYBERSECURITY_TEMPLATE_ID}
                        buttonText={t('common.learnMore')}
                        buttonStartIcon={ getSVGIcon('external-link', 16) }
                      />
                    </Box>
                    <Typography variant="subtitle1" component="p" sx={{ fontWeight: 700, mb: 1 }}>{translations.networkBoxForSMEs.key.title}</Typography>
                    <Box component="div" className="flex flex-wrap gap-2 mb-2">
                      {translations.networkBoxFeatures.map((feature: string, index: number) => (
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
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: theme.palette.text.darkBlue, mb: 1 }}>{translations.whyTPlusSecurityPartners.title}</Typography>
                  <List sx={{ color: theme.palette.text.darkBlue, fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
                    {translations.securityPartnerReasons.map((reason: string, i: number) => (
                      <ListItem key={`reason-${i}`} className="!py-0">
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