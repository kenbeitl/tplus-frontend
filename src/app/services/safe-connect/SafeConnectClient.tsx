'use client';

import React from "react";
import { Badge, Box, Button, Card, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemText, Paper, Switch, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { Eye, Mail, Search, Shield, Star, Users } from "lucide-react";

import { Tag, Spacer, TabList, Tab, TabPanel, StyledIcon, FormField, ButtonWithFormModal } from "@/components";
import theme from "@/theme/theme";
import { useTranslations } from '@/contexts/AppContext';
import { getLucideIcon } from "@/helpers/utils";

const WEB_VULNERABILITY_ASSESSMENT_TEMPLATE_ID = 'safeconnect-web-vulnerability-assessment';
const NETWORK_BOX_CYBERSECURITY_TEMPLATE_ID = 'safeconnect-network-box-cybersecurity';

export default function SafeConnectClient() {
  const t = useTranslations();
  const [value, setValue] = React.useState('1');
  const [darkWebEmail, setDarkWebEmail] = React.useState('');
  const [darkWebResult, setDarkWebResult] = React.useState<any>({
    found: false,
  });

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
      <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.safeConnect.title") }</Typography>
      <Typography variant="body2" component="p">{ t("pages.safeConnect.context") }</Typography>
      <Tag label={t('common.servicesAvailable')} className="absolute top-4 right-4" startIcon={ getLucideIcon('circle-check-big') } variant="green" />
      <Spacer height={20} />
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
                <Tag 
                  className="font-bold! text-only text-base!"
                  label={translations.tGuard.title}
                  variant="transparent"
                  startIcon={ getLucideIcon('smartphone') }
                />
                <Typography variant="body2" component="p">{translations.tGuard.context}</Typography>
                <Spacer height={20} />
                <Paper
                  className="p-6 bg-linear-to-r from-blue-50 to-green-50"
                  variant="outlined"
                >
                  <Box className="flex items-center">
                    <StyledIcon 
                      icon={<Shield size={32} />} 
                      variant="custom"
                      textColor={theme.palette.icon.green}
                      bgColor="white"
                      size={64}
                      square
                      className="mr-3"
                    />
                    <Box component="div">
                      <Typography variant="body1" component="h4" sx={{ fontWeight: 700 }}>{translations.tGuardApp.name}</Typography>
                      <Typography variant="caption" component="p">{translations.tGuardApp.description}</Typography>
                      <Box component="div" className="flex gap-4 mt-3">
                        <Tag label={translations.tGuardApp.freeDownload} variant="green" />
                        <Box component="div" className="flex">
                          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                          <span className="text-sm text-muted-foreground">(12,847)</span>
                        </Box>  
                      </Box>
                    </Box>
                  </Box>
                  <Spacer height={20} />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={ getLucideIcon('download', 16) } 
                    sx={{ width: "100%" }} onClick={() => window.open(translations.tGuardApp.link, "_blank")}
                  >
                    {translations.tGuardApp.buttonText}
                  </Button>
                </Paper>
                <Spacer height={20} />
                <Box component="div" className="grid grid-cols-2 gap-3">
                  {translations.tGuardFeatures.map((feature, index: number) => (
                    <Box key={`tg-${index}`} component="div" className="text-center p-3 bg-gray-50 rounded-lg">
                      <Box component="div" className="h-8 w-8 text-blue-600 mx-auto mb-2">
                        { getLucideIcon(feature.icon, 32) }
                      </Box>
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
                  label={translations.darkWeb.title}
                  variant="transparent"
                  startIcon={<Eye />}
                />
                <Typography variant="body2" component="p">{translations.darkWeb.context}</Typography>
                <Spacer height={20} />
                  <Box component="div" className="flex justify-between items-center">
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
                      startIcon={<Search size={16} />} 
                      sx={{ width: "100%", mt: 1 }} onClick={handleDarkWebCheck} disabled={!darkWebEmail || !darkWebEmail.includes('@')}
                    >
                      {translations.darkWeb.emailBreachCheck.buttonText}
                    </Button>
                  </div>
                  <Typography variant="caption" component="p" sx={{ mt: 1 }}>{translations.darkWeb.emailBreachCheck.remarks}</Typography>
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
                              getLucideIcon(
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
                                        <p className="font-medium text-sm">{breach.name}</p>
                                        <p className="text-xs text-muted-foreground">{breach.date}</p>
                                      </div>
                                      <Badge badgeContent={breach.compromisedData.length} color="error">
                                        { getLucideIcon('shield-alert') }
                                      </Badge>
                                    </div>
                                    <p className="text-xs mt-2 text-muted-foreground">
                                      {`${t('pages.safeConnect.compromised')} ${breach.compromisedData.join(', ')}`}
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
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: theme.palette.text.darkBlue, mb: 1 }}>{translations.darkWebEligibility.title}</Typography>
                    <List sx={{ color: theme.palette.text.blue, fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
                      {translations.darkWebFeatures.map((features: string, i: number) => (
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
                  label={translations.webVulnerability.title}
                  variant="transparent"
                  startIcon={<Search />}
                />
                <Typography variant="body2" component="p">{translations.webVulnerability.context}</Typography>
                <Spacer height={20} />
                <Card variant="outlined" className="p-3 bg-green-50! border-green-200!">
                  <Tag 
                    className="font-bold! text-only text-base!"
                    label={translations.webVulnerability.freeAnnual.title}
                    variant="transparent"
                    startIcon={ getLucideIcon('circle-check-big') }
                  />
                  <Typography variant="caption" component="p">{translations.webVulnerability.freeAnnual.body}</Typography>
                </Card>
                <Spacer height={20} />
                <Box component="div" className="flex items-center justify-between mb-3">
                  <Typography variant="body1" component="h4" className="font-bold!">{translations.webVulnerability.newRequest.title}</Typography>
                  <Tag
                    variant="green" 
                    className="text-xs!"
                    label={translations.webVulnerability.newRequest.freeQuota}
                  />
                </Box>
                <ButtonWithFormModal
                  templateId={WEB_VULNERABILITY_ASSESSMENT_TEMPLATE_ID} 
                  buttonStartIcon={<Search size={20} />}
                  buttonText={translations.webVulnerability.newRequest.buttonText}
                />
                <Spacer height={40} />
                <Card variant="outlined" className="p-5 bg-blue-50! border-blue-200!">
                  <Box component="div" className="flex">
                    <Mail size={24} className="text-blue-600 mr-3 shrink-0" />
                    <Box>
                      <Typography variant="subtitle1" component="p" color={theme.palette.text.darkBlue} sx={{ fontWeight: 700 }}>
                        {translations.webVulnerability.reportsViaEmail.title}
                      </Typography>
                      <Typography variant="caption" component="p" color={theme.palette.text.blue}>
                        {/* TODO: Replace by rich text block */}
                        {translations.webVulnerability.reportsViaEmail.line1}<br/><br/>
                        {translations.webVulnerability.reportsViaEmail.line2}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
                <Tag 
                  className="font-bold! text-only text-base!"
                  label={translations.consultingServices.title}
                  variant="transparent"
                  startIcon={<Users />}
                />
                <Typography variant="body2" component="p">{translations.consultingServices.context}</Typography>
                <Spacer height={20} />
                <Card variant="outlined" className="px-5 py-7 card-hover">
                    <Box component="div" className="flex items-center mb-3">
                      <Typography variant="body1" component="h4" className="font-bold!">{translations.networkBoxForSMEs.title}</Typography>
                      <Tag
                        variant="white" 
                        className="text-xs! mx-2"
                        label={translations.networkBoxForSMEs.tag}
                      />
                      <Box component="div" className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </Box>
                    </Box>
                    <Typography variant="caption" component="p" sx={{ mb: 3 }}>{translations.networkBoxForSMEs.body}</Typography>
                    <Typography variant="subtitle1" component="p" sx={{ fontWeight: 700 }}>{translations.networkBoxForSMEs.provider.title}</Typography>
                    <Typography variant="body2" component="p" sx={{ mb: 3 }}>{translations.networkBoxForSMEs.provider.name}</Typography>
                    <Typography variant="subtitle1" component="p" sx={{ fontWeight: 700 }}>{translations.networkBoxForSMEs.startingAt.title}</Typography>
                    <Typography variant="body2" component="p" sx={{ mb: 3 }}>{translations.networkBoxForSMEs.startingAt.price}</Typography>
                    <Box component="div" className="flex justify-end mb-2">
                      <ButtonWithFormModal
                        buttonProps={{
                          sx:{ width: 'auto' }
                        }}                        
                        templateId={NETWORK_BOX_CYBERSECURITY_TEMPLATE_ID}
                        buttonText={t('common.learnMore')}
                        buttonStartIcon={ getLucideIcon('external-link', 16) }
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