'use client';

import Spacer from '@/components/ui/Spacer';
import { Box, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Tag from '@/components/Tag';
import ActionButton from '@/components/ActionButton';
import { ArrowRight, Brain, CircleCheckBig, FileText, Search } from 'lucide-react';
import ButtonWithFormModal from '@/components/ButtonWithFormModal';
import { useTranslations } from '@/contexts/AppContext';

export default function GovConnectClient() {
    const t = useTranslations();
    const DUAL_DECLARATION_FORM_ID = 'govconnect-dual-declaration';
    return (
        <Box component="div" className="relative">
        <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.govConnect.title") }</Typography>
        <Typography variant="body2" component="p">{ t("pages.govConnect.context") }</Typography>
        <Tag label="Services Available" className="absolute top-4 right-4" startIcon={<CircleCheckBig />} variant="green" />
        <Spacer height={20} />
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined" className="p-6" sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
                    <FileText size={24} />
                    <Typography variant="h6" component="h2">Single Submission for Dual Declaration</Typography>
                </Box>
                <Typography sx={{ mt: 2 }} variant="body2" component="p">
                    Streamline customs declarations with single submission for both import and export requirements
                </Typography>
                <List sx={{ flexGrow: 1 }}>
                    <ListItem>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary="Reduce paperwork by 60%" />
                    </ListItem>
                    <ListItem>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary="Faster processing time" />
                    </ListItem>
                    <ListItem>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary="Single point of submission" />
                    </ListItem>
                </List>
                <ButtonWithFormModal
                    formId={DUAL_DECLARATION_FORM_ID} 
                    buttonEndIcon={<ArrowRight />}
                    buttonText="Apply Now"
                />
                </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined" className="p-6" sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
                    <Search size={24} />
                    <Typography variant="h6" component="h2">HS Code AI Classifier</Typography>
                </Box>
                <Typography sx={{ mt: 2 }} variant="body2" component="p">
                    Get AI-powered HS code classification for your products instantly
                </Typography>
                <List sx={{ flexGrow: 1 }}>
                    <ListItem>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary="HK HS Code (Ask Tracie)" />
                    </ListItem>
                    <ListItem>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary="China HS Code (Ask Xiao Cui)" />
                    </ListItem>
                    <ListItem>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary="Instant classification results" />
                    </ListItem>
                </List>
                <ActionButton buttonText="Launch Classifier" endIcon={<ArrowRight />} />
                </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined" className="p-6" sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
                }}>
                <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
                    <Brain size={24} />
                    <Typography variant="h6" component="h2">AI-Powered Customs Automation</Typography>
                </Box>
                <Typography sx={{ mt: 2 }} variant="body2" component="p">
                    Automate customs declarations with AI-powered document processing
                </Typography>
                <List sx={{ flexGrow: 1 }}>
                    <ListItem>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary="Automated data extraction" />
                    </ListItem>
                    <ListItem>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary="Import & export declarations" />
                    </ListItem>
                    <ListItem>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary="Ready in 10 minutes" />
                    </ListItem>
                </List>
                <ActionButton buttonText="Launch Service" endIcon={<ArrowRight />} />
                </Card>
            </Grid>
        </Grid>
        </Box>
    );
}