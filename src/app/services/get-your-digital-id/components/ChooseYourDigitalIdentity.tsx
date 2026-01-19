'use client';

import { Checklist, Spacer } from "@/components";
import theme from "@/theme/theme";
import { Box, Button, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { getSVGIcon } from "@/helpers/utils";
import { useState } from "react";
import { Option } from "lucide-react";

interface requirementItem {
    item: string;
    icon: string;
}

interface ChooseYourDigitalIdentityProps {
    chooseYourDigitalIdentity: {
        title: string;
        context: string;
        options: Array<{
            name: string;
            image: string;
            description: string;
            eligibility: {
                title: string;
                criteria: string[];
            },
            features: {
                title: string;
                list: string[];
            },
            requirements: {
                title: string;
                list: requirementItem[];
            },
            buttonText: string;
            buttonLink: string;
        }>;
    }
}

export default function ChooseYourDigitalIdentity({ chooseYourDigitalIdentity }: ChooseYourDigitalIdentityProps) {

    const [selectYourDocumentTypeModal, setSelectYourDocumentTypeModal] = useState(false);

    const handleAction = (action: string) => {
        if (action === 'open-modal') {
            setSelectYourDocumentTypeModal(true);
        } else if (action) {
        // External URL
        window.open(action, '_blank');
        }
    };

    const DIGITAL_IDENTITY_OPTIONS = chooseYourDigitalIdentity.options;

    return (
        <>
            <Typography variant="h5" component="h2" className="text-center font-bold!">{chooseYourDigitalIdentity.title}</Typography>
            <Spacer height={30} />
            <Grid container spacing={3}>
                {Array.isArray(DIGITAL_IDENTITY_OPTIONS) && DIGITAL_IDENTITY_OPTIONS.map((option) => {
                
                    return (
                        <Grid key={`dio-${option.name}`} size={{ xs: 12, sm: 6 }}>
                            <Card variant="outlined" className="border-2! hover:border-blue-300! hover:shadow-md! transition-all! flex flex-col items-center p-6 h-full">
                            <Box className="pt-4 px-4 w-full h-32 flex items-center justify-center">
                                <img src={`/assets/logo/${option.image}`} alt={Option.name} width={200} />
                            </Box>
                            <Spacer height={10} />
                            <Typography variant="h5" component="h3" sx={{fontWeight: 'normal' }}>{option.name}</Typography>
                            <Typography variant="subtitle2" component="p" className="font-normal!" color={theme.palette.text.secondary}>{option.description}</Typography>
                            <Spacer height={10} />
                            <Box component="div" className="text-left w-full mb-3">
                                <Typography variant="h6" component="h4">{ option.eligibility.title }</Typography>
                                <Checklist items={option.eligibility.criteria} />
                                <Spacer height={10} />
                                <Typography variant="h6" component="h4">{ option.features.title }</Typography>
                                <Checklist items={option.features.list} />
                                <Spacer height={10} />
                                <Typography variant="h6" component="h4">{ option.requirements.title }</Typography>
                                <List className="grow">
                                    {option.requirements.list.map((requirement: requirementItem, r: number) => (
                                    <ListItem key={`requirement-${r}`} sx={{ mb: 0 }}>
                                        <ListItemIcon>
                                            { getSVGIcon(requirement.icon, 16, theme.palette.icon.blue) }
                                        </ListItemIcon>
                                        <ListItemText primary={requirement.item} slotProps={{ primary: { sx: { fontSize: '14px'} } }} />
                                    </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={() => handleAction(option.buttonLink)}
                                sx={{ width: '100%', mt: 'auto' }}
                            >
                                { option.buttonText  }
                            </Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}