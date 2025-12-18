'use client';

import { Box, Typography } from '@mui/material';
import { Emoji, Spacer, StyledIcon } from '@/components';
import { getSVGIcon, subSlot } from '@/helpers/utils';

interface WelcomeSectionProps {
    title: string;
    line1: string;
    line2: string;
}

export default function WelcomeSection({ title, line1, line2 }: WelcomeSectionProps) {
    return (
        <Box className="flex flex-col items-center text-center py-8" component="div">
            <StyledIcon 
                icon={getSVGIcon('circle-check-big', 32)} 
                variant="green"
                size={64}
            />
            <Spacer height={10} />
            <Box className="flex items-center">
                <Emoji symbol="🎉" size={40} sx={{ mr: 1 }} />
                <Typography variant="h4" component="h2">
                    {title}
                </Typography>
            </Box>
            <Spacer height={20} />
            <Typography variant="body2" component="p">
                {line1}
            </Typography>
            <Spacer height={20} />
            <Typography 
                variant="body2" 
                component="p" 
                dangerouslySetInnerHTML={{ __html: line2 }} 
            />
        </Box>
    );
}
