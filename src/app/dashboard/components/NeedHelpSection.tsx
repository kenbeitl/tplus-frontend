'use client';

import { Box, Card, Link, Typography } from '@mui/material';
import { ButtonWithFormModal, Emoji, Spacer } from '@/components';

interface NeedHelpSectionProps {
    title: string;
    context: string;
    helpCentreText: string;
    contactSupportText: string;
}

const CONTACT_SUPPORT_TEMPLATE_ID = 'contact-support';

export default function NeedHelpSection({ 
    title, 
    context, 
    helpCentreText,
    contactSupportText
}: NeedHelpSectionProps) {
    return (
        <Card variant="outlined" className="p-6">
            <Box className="flex items-center">
                <Emoji symbol="🛠️" size={25} sx={{ mr: 1 }} />
                <Typography variant="body1" component="h3" fontWeight={500}>
                    {title}
                </Typography>
            </Box>
            <Typography variant="body2" component="p" sx={{ mt: 2 }}>
                {context}
            </Typography>
            <Spacer height={20} />
            <Box className="flex flex-row gap-5 justify-center items-center" component="div">
                <Link variant="caption" href="/help-centre" underline="hover">
                    {helpCentreText}
                </Link>
                |
                <ButtonWithFormModal
                    textOnly={true}
                    templateId={CONTACT_SUPPORT_TEMPLATE_ID} 
                    buttonText={contactSupportText}
                />
            </Box>
        </Card>
    );
}
