'use client';

import { StyledIcon } from "@/components";
import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";
import { Box, Card, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";

interface WhyYouNeedADigitalIdentityProps {
  whyYouNeedADigitalIdentity: {
    title: string;
    context: string;
    benefits: string[];
  };
  quickEasyApply: {
    title: string;
    features: string[];
  };
}

export default function WhyYouNeedADigitalIdentity({
  whyYouNeedADigitalIdentity,
  quickEasyApply,
}: WhyYouNeedADigitalIdentityProps) {
  return (
    <Card variant="outlined" className="px-5 py-7 bg-linear-to-r! from-blue-50! to-indigo-50! border-2! border-blue-200!">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box component="div">
            <Box component="div" className="flex items-center gap-3 mb-3">
              <StyledIcon
                icon={ getSVGIcon('id-card', 24) }
                size={54}
                variant="blue-inverted"
                square
                className="shrink-0"
              />
              <Typography variant="h2" component="h2">{whyYouNeedADigitalIdentity.title}</Typography>
            </Box>
            <Typography variant="body1" component="p">{whyYouNeedADigitalIdentity.context}</Typography>
            <List>
              {whyYouNeedADigitalIdentity.benefits.map((benefit: string, b_idx: number) => (
                <ListItem key={`benefit-${b_idx}`}>
                  <ListItemIcon sx={{ mr: 1 }}>
                    { getSVGIcon('circle-check-big', 24, theme.palette.icon.lightGreen) }
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" className="p-6 flex flex-col w-full h-full">
            <Box component="div" className="flex items-center">
              <Box component="div" className="mr-3">{ getSVGIcon('clock', 20, theme.palette.icon.blue) }</Box>
              <Typography variant="h6" component="h3">{quickEasyApply.title}</Typography>
            </Box>
            <Divider className="my-3!" />
            <List sx={{ py: 0, pl: 2, ml: 1, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item', '&::marker': { color: theme.palette.text.blue, fontSize: '1.5em' } } }}>
              {quickEasyApply.features?.map((feature: string, f_idx: number) => (
                <ListItem key={`features-${f_idx}`} className="py-0! mb-0!">
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Card>
  );
}
