'use client';
import {
  Box,
  Card, CardContent,
  Grid,
  List, ListItem, ListItemIcon, ListItemText,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography,
} from '@mui/material';
import Spacer from '@/components/ui/Spacer';
import InfoModal from '@/components/InfoModal';
import { CircleCheckBig } from 'lucide-react';
import InlineTag from '@/components/InlineTag';

const DIALOG_CARD = [
  {
    id: "1", identity: "iAM Smart", userType: "Local Individuals", description: "Hong Kong government digital identity for residents",
    features: [
      "Government services access",
      "Local business verification",
      "Secure authentication",
    ],
    eligibility: "Hong Kong residents with HKID",
    processingTime: "1-2 business days",
  },
  {
    id: "2", identity: "iD-One", userType: "Global Individuals", description: "International digital identity for global users",
    features: [
      "Cross-border services",
      "International verification",
      "Multi-jurisdiction support",
    ],
    eligibility: "International users with valid passport",
    processingTime: "3-5 business days",
  },
  {
    id: "3", identity: "CorpID", userType: "Local Corporations", description: "Hong Kong corporate digital identity",
    features: [
      "Local business registration",
      "Government compliance",
      "Corporate verification",
    ],
    eligibility: "Hong Kong registered companies",
    processingTime: "2-3 business days",
  },
  {
    id: "4", identity: "iCorp-One", userType: "Global Corporations", description: "International corporate digital identity",
    features: [
      "Global business verification",
      "Cross-border compliance",
      "International standards",
    ],
    eligibility: "Internationally registered companies",
    processingTime: "5-7 business days",
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DialogDigital({ open, onClose }: Props) {
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
      title="Digital Identity Comparison Guide"
      subtitle="Choose the right digital identity for your needs"
    >
        {/* FIXME - table / something else not implemented */}
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table size="small" aria-label="digital identity comparison table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, fontSize: '14px', p: 1 }}>Identity</TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '14px', p: 1 }}>User Type</TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '14px', p: 1 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '14px', p: 1 }}>Processing Time</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {DIALOG_CARD.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500, fontSize: '14px', p: 1}}>
                    {row.identity}
                  </TableCell>

                  <TableCell sx={{ fontSize: '14px', p: 1}}>{row.userType}</TableCell>

                  <TableCell sx={{ fontSize: '14px', p: 1, maxWidth: 360, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    {row.description}
                  </TableCell>

                  <TableCell sx={{ fontSize: '14px', p: 1}}>{row.processingTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Spacer height={30} />
        <Grid container spacing={2}>
          {DIALOG_CARD.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={item.id}>
              <Card variant="outlined" sx={{ height: '100%', p: 0 }}>
                {/* Use CardActionArea if you want the whole card clickable */}
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Typography variant="h6" component="h3">{item.identity}</Typography>
                  </Box>

                  <InlineTag 
                    variant="white"
                    label={item.userType}
                  />

                  <Typography sx={{ fontSize: 14, mt: 2, mb: 1.5 }} variant="body2">
                    {item.description}
                  </Typography>

                  <Typography sx={{ fontSize: 14, mb: 0 }} variant="body2">
                    Key Features:
                  </Typography>

                  <List dense>
                    {item.features.map((f) => (
                      <ListItem key={f} disableGutters>
                        <ListItemIcon sx={{ minWidth: 12 }}>
                          <CircleCheckBig size={12} color="#87e119" />
                        </ListItemIcon>
                        <ListItemText
                          slotProps={{
                            primary: {
                              variant: 'body2',
                              sx: {
                                fontSize: '12px',
                              }
                            }
                          }}
                          primary={f}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {item.eligibility && (
                    <Typography sx={{ fontSize: 12, mt: 1 }} variant="body2">
                      <Box component="span" sx={{ fontWeight: 700, mr: 1 }}>Eligibility:</Box>
                      {item.eligibility}
                    </Typography>
                  )}

                  {item.processingTime && (
                    <Typography sx={{ fontSize: 12, mb: 0 }} variant="body2">
                      <Box component="span" sx={{ fontWeight: 700, mr: 1 }}>Processing:</Box>
                      {item.processingTime}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
    </InfoModal>
  );
}

