import { Metadata } from "next";
import Carousel from "@/components/Carousel";
import Spacer from "@/components/ui/Spacer";
import { Award, Building, Building2, Calendar, CircleCheckBig, CreditCard, FilePenLine, Link, Shield } from "lucide-react";
import StyledIcon from "@/components/StyledIcon";
import { Box, Button, Card, Grid, Icon, Paper, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: 'Dashboard | TPlus',
}

export default function Dashboard() {

  return (
    <>
      <Carousel slideNum={2} />
      <Box
        className="flex flex-col items-center text-center py-8"
        component="div"
      >
        <StyledIcon 
          icon={<CircleCheckBig size={32} />} 
          variant="green"
          size={64}
        />
        <Spacer height={10} />
        <Box className="flex items-center">
          <Icon sx={{ width: 40, height: 40, fontSize: 30, mr: 1 }}>🎉</Icon>
          <Typography variant="h4" component="h2">Welcome to T+</Typography>
        </Box>
        <Spacer height={20} />
        <Typography variant="body2" component="p">Your account has been successfully created — welcome aboard!</Typography>
        <Spacer height={20} />
        <Typography variant="body2" component="p">To help you get started, we've activated a <strong>3-month free trial</strong>, giving you immediate<br /> access to a selection of core services. Explore now and discover how T+ can support<br /> your business.</Typography>
      </Box>

      {/* Get Started Tips */}

      <Card variant="outlined" className="p-6">
        <Box className="flex items-center">
          <Icon sx={{ width: 20, height: 25, fontSize: 16, mr: 1 }}>🚀</Icon>
          <Typography variant="body1" component="h3">Get Started Tips</Typography>
        </Box>
        <Typography variant="body2" component="p" sx={{ mt: 2 }}>Follow these 3 steps to unlock the full potential of T+</Typography>
        <Spacer height={20} />
        <Grid container spacing={2}>
          <Grid size="grow">
            <Card variant="outlined" className="p-3 lg:p-6"></Card>
          </Grid>
          <Grid size={1}>
            <Card variant="outlined" className="p-3 lg:p-6"></Card>
          </Grid>
          <Grid size="grow">
            <Card variant="outlined" className="p-3 lg:p-6"></Card>
          </Grid>
          <Grid size={1}>
            <Card variant="outlined" className="p-3 lg:p-6"></Card>
          </Grid>
          <Grid size="grow">
            <Card variant="outlined" className="p-3 lg:p-6"></Card>
          </Grid>
        </Grid>
      </Card>
      <Spacer height={20} />

      {/* Free Trial Features */}

      <Card variant="outlined" className="p-6">
        <Box className="flex items-center">
          <CircleCheckBig size="20" color="#016630" className="mr-2" />
          <Icon sx={{ width: 20, height: 25, fontSize: 16, mr: 1 }}>🆓</Icon>
          <Typography variant="body1" component="h3" color="#016630">Free Trial Features</Typography>
        </Box>
        <Typography variant="body2" component="p" sx={{ mt: 2 }}>You can start using these features right away (some with limited access):</Typography>
        <Spacer height={20} />
        <Grid container spacing={2}>
          <Grid size={12}>
            <Paper elevation={0} className="p-3 bg-green-50!">
              <Box className="flex items-top">
                <StyledIcon 
                  icon={<FilePenLine size={18} />} 
                  variant="green"
                  size={36}
                  square
                  className="mr-3"
                />
                <Box>
                  <Typography variant="body1" component="h4">SignConnect</Typography>
                  <Typography variant="caption" component="p" color="#016630">Sign documents via Tradelink's DMSS using a certified digital identity (limited signing quota).</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={12}>
            <Paper elevation={0} className="p-3 bg-green-50!">
              <Box className="flex items-top">
                <StyledIcon 
                  icon={<CreditCard size={18} />} 
                  variant="green"
                  size={36}
                  square
                  className="mr-3"
                />
                <Box>
                  <Typography variant="body1" component="h4">PayConnect</Typography>
                  <Typography variant="caption" component="p" color="#016630">Enjoy exclusive offers on financial services provided by T+ partners.</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={12}>
            <Paper elevation={0} className="p-3 bg-green-50!">
              <Box className="flex items-top">
                <StyledIcon 
                  icon={<Building2 size={18} />} 
                  variant="green"
                  size={36}
                  square
                  className="mr-3"
                />
                <Box>
                  <Typography variant="body1" component="h4">GovConnect</Typography>
                  <Typography variant="caption" component="p" color="#016630">Use smart trade functions to automate and enhance trade compliance.</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={12}>
            <Paper elevation={0} className="p-3 bg-green-50!">
              <Box className="flex items-top">
                <StyledIcon 
                  icon={<Shield size={18} />} 
                  variant="green"
                  size={36}
                  square
                  className="mr-3"
                />
                <Box>
                  <Typography variant="body1" component="h4">SafeConnect</Typography>
                  <Typography variant="caption" component="p" color="#016630">Access cybersecurity services for individuals and corporations (some features may be limited).</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={12}>
            <Card variant="outlined" className="p-3 bg-blue-50! border-blue-200!">
              <Typography variant="caption" component="h4" color="#2b7fff"><em>Note: Some features may require a subscription after the trial period ends. Click on the relevant pages in the menu to start using them.</em></Typography>
            </Card>
          </Grid>
        </Grid>
      </Card>
      <Spacer height={20} />

      {/* Features Available Soon */}

      <Card variant="outlined" className="p-6">
        <Box className="flex items-center">
          <Calendar size="20" color="#c05621" className="mr-2" />
          <Icon sx={{ width: 20, height: 25, fontSize: 16, mr: 1 }}>🔐</Icon>
          <Typography variant="body1" component="h3" color="#c05621">Features Available Soon</Typography>
        </Box>
        <Typography variant="body2" component="p" sx={{ mt: 2 }}>These advanced features are being rolled out progressively. Some will only be available with a subscription:</Typography>
        <Spacer height={20} />
        <Grid container spacing={2}>
          <Grid size={12}>
            <Paper elevation={0} className="p-3 bg-orange-50!">
              <Box className="flex items-top">
                <StyledIcon 
                  icon={<FilePenLine size={18} />} 
                  variant="orange"
                  size={36}
                  square
                  className="mr-3"
                />
                <Box>
                  <Typography variant="body1" component="h4">SignConnect</Typography>
                  <Typography variant="caption" component="p" color="#c05621">Sign via other platforms (e.g. DocuSign, Fadada) and access premium features such as AI Document Assistant and AI Legal Assistant — exclusive to T+ members.</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={12}>
            <Paper elevation={0} className="p-3 bg-amber-50!">
              <Box className="flex items-top">
                <StyledIcon 
                  icon={<Building size={18} />} 
                  variant="amber"
                  size={36}
                  square
                  className="mr-3"
                />
                <Box>
                  <Typography variant="body1" component="h4">BizConnect</Typography>
                  <Typography variant="caption" component="p" color="#B45309">Comprehensive business intelligence, due diligence services, and global market entry support launching soon.</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={12}>
            <Paper elevation={0} className="p-3 bg-orange-50!">
              <Box className="flex items-top">
                <StyledIcon 
                  icon={<Building2 size={18} />} 
                  variant="orange"
                  size={36}
                  square
                  className="mr-3"
                />
                <Box>
                  <Typography variant="body1" component="h4">GovConnect</Typography>
                  <Typography variant="caption" component="p" color="#c05621">Use advanced AI tools to automate trade compliance (e.g. AI-powered customs automation) and connect to more government services via T+.</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>          
          <Grid size={12}>
            <Paper elevation={0} className="p-3 bg-orange-50!">
              <Box className="flex items-top">
                <StyledIcon 
                  icon={<Shield size={18} />} 
                  variant="orange"
                  size={36}
                  square
                  className="mr-3"
                />
                <Box>
                  <Typography variant="body1" component="h4">SafeConnect</Typography>
                  <Typography variant="caption" component="p" color="#c05621">Add-on cybersecurity services, such as additional web vulnerability assessments.</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={12}>
            <Paper elevation={0} className="p-3 bg-orange-50!">
              <Box className="flex items-top">
                <StyledIcon 
                  icon={<Award size={18} />} 
                  variant="orange"
                  size={36}
                  square
                  className="mr-3"
                />
                <Box>
                  <Typography variant="body1" component="h4">ESG</Typography>
                  <Typography variant="caption" component="p" color="#c05621">Track your environmental impact through paperless signing, and download annual ESG certificates or badges/reports from T+ partners with exclusive offers.</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={12}>
            <Card variant="outlined" className="p-3 bg-blue-50! border-blue-200!">
              <Typography variant="body1" component="h4">Ready to upgrade!</Typography>
              <Typography variant="caption" component="h4" color="#2b7fff">Unlock all features by subscribing to our plans — launching soon!</Typography>
              <Button variant="outlined" color="blue" sx={{ mt: 2 }}>View Subscription Plans</Button>
            </Card>
          </Grid>
        </Grid>
      </Card>
      <Spacer height={20} />

      {/* Need help getting started? */}

      <Card variant="outlined" className="p-6">
        <Box className="flex items-center">
          <Icon sx={{ width: 20, height: 25, fontSize: 16, mr: 1 }}>🛠️</Icon>
          <Typography variant="body1" component="h3" fontWeight={500}>Need help getting started?</Typography>
        </Box>
        <Typography variant="body2" component="p" sx={{ mt: 2 }}>Follow these 3 steps to unlock the full potential of T+</Typography>
        <Spacer height={20} />
        <Box
          className="flex flex-col items-center text-center py-8"
          component="div"
        >
          {/* Help Center | Contact Support */}
        </Box>
      </Card>
    </>
  );
}
