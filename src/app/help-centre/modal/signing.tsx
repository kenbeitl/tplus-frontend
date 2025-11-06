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

const DIALOG_CARD = [
  {
    id: "1", platform: "Tradelink", cost: "", 
    bestFor: "Government documents and basic business needs", 
    features: [
      "Global business verification",
      "Cross-border compliance",
      "International standards",
    ],
    availability: "All T+ users",
  },
  {
    id: "2", platform: "DocuSign", cost: "Subscription required", 
    bestFor: "International business and complex workflows", 
    features: [
      "Global business verification",
      "Cross-border compliance",
      "International standards",
    ],
    availability: "Business and Enterprise plans",
  },
  {
    id: "3", platform: "Fadada", cost: "Subscription required", 
    bestFor: "Asia-Pacific business operations", 
    features: [
      "Global business verification",
      "Cross-border compliance",
      "International standards",
    ],
    availability: "Business and Enterprise plans",
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DialogSigning({ open, onClose }: Props) {
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
      title="Signing Platform Comparison"
      subtitle="Choose the best signing platform for your needs"
    >
        {/* FIXME - table / something else not implemented */}
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table size="small" aria-label="digital identity comparison table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, fontSize: '14px', p: 1 }}>Platform</TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '14px', p: 1 }}>Cost</TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '14px', p: 1 }}>Best For</TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '14px', p: 1 }}>Availability</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {DIALOG_CARD.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500, fontSize: '14px', p: 1}}>
                    {row.platform}
                  </TableCell>

                  <TableCell> <Typography sx={{ fontWeight: 500, fontSize: '12px', p: 1, borderRadius: 1}} component="span">{row.cost}</Typography></TableCell>

                  <TableCell sx={{ fontSize: '14px', p: 1, maxWidth: 360, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    {row.bestFor}
                  </TableCell>

                  <TableCell sx={{ fontSize: '14px', p: 1}}>{row.availability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Spacer height={30} />
        <Grid container spacing={2}>
          {DIALOG_CARD.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
              <Card variant="outlined" sx={{ height: '100%', p: 0 }}>
                {/* Use CardActionArea if you want the whole card clickable */}
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Typography variant="h6" component="h3">{item.platform}</Typography>
                  </Box>

                  {/* <Typography
                    sx={{
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      borderRadius: 1,
                      p: '2px 6px',
                    }}
                    variant="button"
                    component="span"
                  >
                    {item.bestFor}
                  </Typography> */}

                  <Typography sx={{ fontSize: 14, mt: 2, mb: 1.5 }} variant="body2">
                    {item.cost}
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

                  {item.bestFor && (
                    <Typography sx={{ fontSize: 12, mt: 1 }} variant="body2">
                      <Box component="span" sx={{ fontWeight: 700, mr: 1 }}>Best for:</Box>
                      {item.bestFor}
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

