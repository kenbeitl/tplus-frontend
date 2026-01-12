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
  const [isCheckingDarkWeb, setIsCheckingDarkWeb] = React.useState(false);

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

  const handleDarkWebCheck = async () => {
    setIsCheckingDarkWeb(true);
    setDarkWebResult({ found: false });

    try {
      const response = await fetch(`/api/leakcheck?check=${encodeURIComponent(darkWebEmail)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Take first 100 results
      const leaks = data.sources?.slice(0, 100) || [];
      const found = leaks.length > 0;
      
      setDarkWebResult({
        email: darkWebEmail,
        atRisk: found,
        leaks: leaks,
        found: found,
        breaches: leaks.map((leak: any) => ({
          name: leak.name || leak.source || 'Unknown Source',
          date: leak.breach_date || leak.date || 'Unknown Date',
          compromisedData: leak.fields || ['Email', 'Password']
        })),
        message: found 
          ? `Your email was found in ${leaks.length} data breach${leaks.length > 1 ? 'es' : ''}.` 
          : 'No breaches found for your email.'
      });
    } catch (error) {
      console.error('Dark web check error:', error);
      setDarkWebResult({
        email: darkWebEmail,
        atRisk: false,
        leaks: [],
        found: false,
        breaches: [],
        message: 'Failed to check for breaches. Please try again later.',
        error: true
      });
    } finally {
      setIsCheckingDarkWeb(false);
    }
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
        <Typography variant="h2" component="h2">{ t("common.ourServices") }</Typography>
      </Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label={translations.individuals.title} value="1" disableRipple />
            <Tab label={translations.corporates.title} value="2" disableRipple />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%' }} className="card-hover">
                <Box component="div" className="flex items-center mb-2">
                  <Box component="span" className="mr-2">{ getSVGIcon('smartphone', 20) }</Box>
                  <Typography variant="h6" component="h4">{translations.tGuard.title}</Typography>
                </Box>
                <Typography variant="body1" component="p">{translations.tGuard.context}</Typography>
                <Spacer height={20} />
                <Paper
                  className={`p-6 ${theme.palette.gradientClasses.blueGreenLight}`}
                  variant="outlined"
                >
                  <Box className="flex sm:max-md:flex-col items-top">
                    <Box component="div" className="p-1 bg-white rounded-xl mr-6 flex items-center justify-center h-18 w-18 shadow-sm">
                      <LogoComponent />  
                    </Box>
                    <Box component="div">
                      <Typography variant="h5" component="h4" className="font-bold">{translations.tGuardApp.name}</Typography>
                      <Typography variant="body2" component="p">{translations.tGuardApp.description}</Typography>
                      <Box component="div" className="flex flex-col-reverse md:flex-row items-center gap-2 mt-3">
                        <Tag label={translations.tGuardApp.freeDownload} variant="green-inverted" className="px-2! py-1! text-sm! font-normal!" />
                        <Box component="div" className="flex items-center gap-1">
                          { getSVGIcon('star', 16, '#EAB308', '#EAB308') }
                          <Typography variant="h6" component="div" className="whitespace-nowrap">4.8 (12,847)</Typography>
                        </Box>  
                      </Box>
                    </Box>
                  </Box>
                  <Spacer height={20} />
                  <Button 
                    className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                    variant="contained"
                    startIcon={ getSVGIcon('download', 16) } 
                    onClick={() => window.open(translations.tGuardApp.link, "_blank")}
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
                      <Typography component="div" variant="h6">{feature.title}</Typography>
                      <Typography component="div" variant="body2">{feature.description}</Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%' }} className="card-hover">
                <Box component="div" className="flex items-center mb-2">
                  <Box component="span" className="mr-2">{ getSVGIcon('eye', 20) }</Box>
                  <Typography variant="h6" component="h4">{translations.darkWeb.title}</Typography>
                </Box>
                <Typography variant="body1" component="p">{translations.darkWeb.context}</Typography>
                <Spacer height={20} />
                  <Box component="div" className="flex flex-col mb-2 md:flex-row justify-between items-start md:items-center">
                    <Typography variant="body1" component="h4">{translations.darkWeb.emailBreachCheck.title}</Typography>
                  </Box>
                  <Box 
                    component="form" 
                    className="mb-2"
                    onSubmit={(e: React.FormEvent) => {
                      e.preventDefault();
                      handleDarkWebCheck();
                    }}
                  >
                    <FormField
                      name="darkWebEmail"
                      value={darkWebEmail}
                      placeholder={translations.darkWeb.emailBreachCheck.placeholder}
                      onChange={(name, value) => setDarkWebEmail(value)}
                      onBlur={() => {}}
                      size="small"
                    />
                    <Spacer height={20} />
                    <Button 
                      type="submit"
                      variant="contained" 
                      color="primary" 
                      startIcon={isCheckingDarkWeb ? null : getSVGIcon('search', 16)} 
                      className="w-full" 
                      disabled={!darkWebEmail || !darkWebEmail.includes('@') || isCheckingDarkWeb}
                    >
                      {isCheckingDarkWeb ? 'Checking...' : translations.darkWeb.emailBreachCheck.buttonText}
                    </Button>
                  </Box>
                  <Typography variant="caption" component="p">{translations.darkWeb.emailBreachCheck.remarks}</Typography>
                  <Spacer height={20} />
                  {darkWebResult && darkWebResult.email && (
                    <>
                      <Box component="div" className={`p-4 rounded-lg border ${
                        darkWebResult.found 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-green-50 border-green-200'
                      }`}>
                        <Box component="div" className="flex items-center space-x-3">
                          <Box component="div">
                            { 
                              getSVGIcon(
                                darkWebResult.found ? 'alert-triangle' : 'circle-check-big', 
                                20, 
                                darkWebResult.found ? '#DC2626' : '#16A34A'
                              ) 
                            }
                          </Box>
                          <Box component="div" className="flex-1">
                            <Typography variant="h6" component="div" className={`font-medium ${
                              darkWebResult.found ? 'text-red-900' : 'text-green-900'
                            }`}>
                              {darkWebResult.found ? t('pages.safeConnect.breachFound') : t('pages.safeConnect.noBreachFound')}
                            </Typography>
                            {darkWebResult.found && darkWebResult.breaches && (
                              <Box component="div" className="mt-3 space-y-2">
                                {darkWebResult.breaches.map((breach: any, index: number) => (
                                  <Box component="div" key={index} className="bg-white p-3 rounded border">
                                    <Box component="div" className="flex justify-between items-start">
                                      <Box component="div">
                                        <Typography className="font-medium" variant="caption">{breach.name}</Typography>
                                        <Typography color="text.secondary" variant="caption">{breach.date}</Typography>
                                      </Box>
                                      <Badge badgeContent={breach.compromisedData.length} color="error">
                                        { getSVGIcon('shield-alert') }
                                      </Badge>
                                    </Box>
                                    <Typography className="mt-8" color="text.secondary" variant="caption">
                                      {`${t('pages.safeConnect.compromised')} ${breach.compromisedData.join(', ')}`}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
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
                        <ListItem key={`features-${i}`}>
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
              <Card variant="outlined" sx={{ p: 3, height: '100%' }} className="card-hover">
                <Box component="div" className="flex items-center mb-2">
                  <Box component="span" className="mr-2">{ getSVGIcon('search', 20) }</Box>
                  <Typography variant="h6" component="h4">{translations.webVulnerability.title}</Typography>
                </Box>
                <Typography variant="body1" component="p">{translations.webVulnerability.context}</Typography>
                <Spacer height={20} />
                <Card variant="outlined" className="p-3 bg-green-50! border-green-200!">
                  <Box component="div" className="flex items-center mb-2">
                    <Box component="span" className="mr-2">{ getSVGIcon('circle-check-big', 16) }</Box>
                    <Typography variant="body1" component="h4">{translations.webVulnerability.freeAnnual.title}</Typography>
                  </Box>
                  <Typography variant="body2" component="p" color={theme.palette.text.green}>{translations.webVulnerability.freeAnnual.body}</Typography>
                </Card>
                <Spacer height={20} />
                <Box component="div" className="flex sm:max-md:flex-col items-start md:items-center justify-between gap-2 mb-2">
                  <Typography variant="body1" component="h4">{translations.webVulnerability.newRequest.title}</Typography>
                  <Tag
                    variant="green-inverted" 
                    className="px-2! py-1! text-sm! font-normal!"
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
                      <Typography variant="body2" component="p" color={theme.palette.text.blue} sx={{ mb: 1 }}>
                        {translations.webVulnerability.reportsViaEmail.line1}
                      </Typography>
                      <Typography variant="body2" component="p" color={theme.palette.text.blue}>
                        {translations.webVulnerability.reportsViaEmail.line2}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%' }} className="card-hover">
                <Box component="div" className="flex items-center mb-2">
                  <Box component="span" className="mr-2">{ getSVGIcon('users', 16) }</Box>
                  <Typography variant="h6" component="h4">{translations.consultingServices.title}</Typography>
                </Box>
                <Typography variant="body1" component="p">{translations.consultingServices.context}</Typography>
                <Spacer height={20} />
                <Card variant="outlined" className="px-5 py-7 card-hover">
                    <Box component="div" className="flex flex-row flex-wrap items-center justify-between gap-2 mb-2">
                      <Typography variant="h5" component="h4">{translations.networkBoxForSMEs.title}</Typography>
                      <Box component="div" className="flex flex-row items-center gap-2">
                        <Tag
                          variant="white" 
                          className="text-sm! font-normal!"
                          label={translations.networkBoxForSMEs.tag}
                        />
                        <Box component="div" className="flex items-center">
                          { getSVGIcon('star', 16, '#EAB308', '#EAB308') }
                          <Typography component="div" variant="subtitle1" className="font-normal!">4.8</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body2" component="p" className="mb-4!">{translations.networkBoxForSMEs.body}</Typography>
                    <Typography variant="body2" component="p" className="font-bold">{translations.networkBoxForSMEs.provider.title}</Typography>
                    <Typography variant="body1" component="p" className="mb-4!">{translations.networkBoxForSMEs.provider.name}</Typography>
                    <Typography variant="body2" component="p" className="font-bold">{translations.networkBoxForSMEs.startingAt.title}</Typography>
                    <Typography variant="body1" component="p" className="mb-4!">{translations.networkBoxForSMEs.startingAt.price}</Typography>
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
                    <Typography variant="h6" component="p" sx={{ mb: 1 }}>{translations.networkBoxForSMEs.key.title}</Typography>
                    <Box component="div" className="flex flex-wrap gap-2 mb-2">
                      {translations.networkBoxFeatures.map((feature: string, index: number) => (
                        <Box component="div" key={`feature-${index}`}>
                          <Tag 
                            className="h-6"
                            variant="blue"
                            label={feature}
                          />
                        </Box>
                      ))}
                    </Box>
                </Card>
                <Spacer height={20} />
                <Card variant="outlined" className="p-5 bg-blue-50! border-blue-200!">
                  <Typography variant="h6" component="h3" color={theme.palette.text.darkBlue} className="mb-2!">{translations.whyTPlusSecurityPartners.title}</Typography>
                  <List sx={{ color: theme.palette.text.blue, fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
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