'use client';

import { useMemo } from 'react';

import theme from '@/theme/theme';
import { Box, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { InfoModal, Spacer, Tag } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon } from '@/helpers/utils';

interface CardItem {
  id?: string;
  availability?: string;
  bestFor?: string;
  cost?: string;
  description?: string;
  eligibility?: string;
  features: string[];
  identity?: string;
  platform?: string;
  processingTime?: string;
  title?: string;
  userType?: string;
}

interface HelpCentreModalContent {
    id: string;
    title: string;
    context: string;
    cards: CardItem[];
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  content: HelpCentreModalContent;
};

export default function HelpCentreModal({open, onClose, content}: ModalProps) {
  const t = useTranslations();
  const cardTitle = (item: CardItem) => item.identity || item.platform || item.title;

  const translations = useMemo(() => {
    const thTranslations = t('pages.helpCentre.tableHeaders');
    return { ...thTranslations }
  }, [t])

  const TABLE_CONFIG: Record<string, (keyof CardItem)[]> = {
    digital: ['identity', 'userType', 'description', 'processingTime'],
    signing: ['platform', 'cost', 'bestFor', 'availability'],
    subscription: ['identity', 'userType', 'description', 'processingTime']
  };

  const config = { fields: TABLE_CONFIG[content.id] || TABLE_CONFIG.digital };

  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
      title={content.title}
      subtitle={content.context}
    >
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table size="small" aria-label="comparison table">
            <TableHead>
              <TableRow>
                {config.fields.map((field) => (
                  <TableCell key={`th-${field}`} sx={{ fontWeight: 500, fontSize: '14px', p: 1 }}>
                    {translations[field]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(content.cards) && content.cards.map((row, index) => (
                <TableRow key={row.id || `row-${index}`} hover>
                  {config.fields.map((field, idx) => (
                    <TableCell 
                      key={`cell-${field}`}
                      component={idx === 0 ? 'th' : 'td'}
                      scope={idx === 0 ? 'row' : undefined}
                      sx={{ 
                        fontWeight: idx === 0 ? 500 : 400,
                        fontSize: '14px', 
                        p: 1,
                        maxWidth: idx === 2 ? 360 : 'auto',
                        whiteSpace: idx === 2 ? 'normal' : 'nowrap',
                        wordBreak: idx === 2 ? 'break-word' : 'normal'
                      }}
                    >
                      {field === 'cost' ? (
                        <Tag variant="transparent" label={row[field]} />
                      ) : (
                        row[field]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Spacer height={30} />
        <Grid container spacing={2}>
          {Array.isArray(content.cards) && content.cards.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={item.id || `card-${index}`}>
              <Card variant="outlined" sx={{ height: '100%', p: 0 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" component="h3">
                    {cardTitle(item)}
                  </Typography>

                  {item.userType && (
                    <Tag 
                      variant="white"
                      label={item.userType}
                    />
                  )}

                  {item.description && (
                    <Typography sx={{ fontSize: 14, mt: 2, mb: 1.5 }} variant="body2">
                      {item.description}
                    </Typography>
                  )}

                  {item.features && item.features.length > 0 && (
                    <>
                      <Typography sx={{ fontSize: 14, mb: 0 }} variant="body2">{ t('pages.helpCentre.keyFeatures') }</Typography>
                      <List dense>
                        {item.features.map((f: string, idx) => (
                          <ListItem key={`feature-${idx}`} disableGutters>
                            <ListItemIcon sx={{ minWidth: 12 }}>
                              { getSVGIcon('circle-check-big', 12, theme.palette.icon.green) }
                            </ListItemIcon>
                            <ListItemText
                              slotProps={{
                                primary: {
                                  variant: 'body2',
                                  sx: { fontSize: '12px' }
                                }
                              }}
                              primary={f}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}

                  {item.eligibility && (
                    <Typography sx={{ fontSize: 12, mt: 1 }} variant="body2">
                      <Box component="span" sx={{ fontWeight: 700, mr: 1 }}>{`${translations.eligibility}:`}</Box>
                      {item.eligibility}
                    </Typography>
                  )}

                  {item.processingTime && (
                    <Typography sx={{ fontSize: 12, mb: 0 }} variant="body2">
                      <Box component="span" sx={{ fontWeight: 700, mr: 1 }}>{`${translations.processingTime}:`}</Box>
                      {item.processingTime}
                    </Typography>
                  )}

                  {item.bestFor && (
                    <Typography sx={{ fontSize: 12, mt: 1 }} variant="body2">
                      <Box component="span" sx={{ fontWeight: 700, mr: 1 }}>{`${translations.bestFor}:`}</Box>
                      {item.bestFor}
                    </Typography>
                  )}

                  {item.availability && (
                    <Typography sx={{ fontSize: 12, mb: 0 }} variant="body2">
                      <Box component="span" sx={{ fontWeight: 700, mr: 1 }}>{`${translations.availability}:`}</Box>
                      {item.availability}
                    </Typography>
                  )}

                  {item.cost && (
                    <Typography sx={{ fontSize: 12, mt: 1 }} variant="body2">
                      <Box component="span" sx={{ fontWeight: 700, mr: 1 }}>{`${translations.cost}:`}</Box>
                      {item.cost}
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