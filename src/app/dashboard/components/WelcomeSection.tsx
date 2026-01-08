'use client';

import { Box, Typography } from '@mui/material';
import { Emoji, Spacer } from '@/components';
import theme from '@/theme/theme';

interface WelcomeSectionProps {
    title: string;
    context: string;
}

export default function WelcomeSection({ title, context }: WelcomeSectionProps) {
    return (
        <Box className="flex flex-col items-center text-center py-8" component="div">
            <Box className="flex items-center">
                <Emoji symbol="🎉" size={40} sx={{ mr: 1 }} />
                <Typography variant="h1" component="h1" color={theme.palette.text.darkBlue} sx={{ fontWeight: 700 }}>{title}</Typography>
            </Box>
            <Spacer height={20} />
            <Typography variant="h3" component="p" color={theme.palette.text.blue} className="max-w-3xl">{context}</Typography>
        </Box>
    );
}
