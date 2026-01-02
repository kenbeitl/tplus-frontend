'use client';

import { Badge, Box, CardContent, Typography } from '@mui/material';
import { Emoji, StyledIcon } from '@/components';
import { getSVGIcon } from '@/helpers/utils';
import theme from '@/theme/theme';
import { useRouter } from 'next/navigation';

interface QuickAction {
    icon: string;
    iconStyle: string;
    title: string;
    tag: string;
    tagStyle: string;
    context: string;
    ctaLabel: string;
    ctaLink: string;
    ctaStyle: string;
}

interface QuickActionsSectionProps {
    title: string;
    context: string;
    actions: QuickAction[];
}

export default function QuickActionsSection({ title, context, actions }: QuickActionsSectionProps) {
    const router = useRouter();

    return (
        <Box component="div" className={`relative overflow-hidden rounded-2xl ${theme.palette.gradientClasses.blueLight} p-6 border-2 border-blue-200`}>
            <Box component="div" className="relative">
                <Box component="div" className="flex items-center gap-3 mb-5">
                    <Box component="div" className={`flex items-center justify-center w-12 h-12 ${theme.palette.gradientClasses.blueCyan} rounded-xl shadow-lg`}>
                        {getSVGIcon('zap', 24, theme.palette.text.white)}
                    </Box>
                    <Box component="div">
                        <Typography variant="h3" component="h2" color={theme.palette.text.darkBlue}>
                            <Emoji symbol="⚡" size={50} sx={{ mr: 1 }} />
                            {title}
                        </Typography>
                        <Typography variant="body2" component="p">{context}</Typography>
                    </Box>
                </Box>
                <Box component="div" className="space-y-4">
                    {actions.map((action, index) => (
                        <Box
                            component="div" 
                            className="group border-2 border-blue-200 bg-white rounded-xl cursor-pointer hover:shadow-2xl hover:border-blue-400 hover:scale-105 transition-transform duration-300" 
                            key={`quick-action-card-${index}`}
                            onClick={() => router.push(action.ctaLink)}
                        >
                            <CardContent className="p-5">
                                <Box component="div" className="flex items-start gap-4">
                                    <Box component="div" className="flex items-center justify-center rounded-xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                                        <StyledIcon 
                                            icon={getSVGIcon(action.icon, 28, '#FFFFFF')} 
                                            size={56} 
                                            bgGradient={action.iconStyle}
                                            square
                                        />
                                    </Box>
                                    <Box component="div" className="flex-1 space-y-2">
                                        <Box component="div" className="flex items-start gap-2">
                                            <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>{action.title}</Typography>
                                            <Badge className={`py-1 px-3 rounded-xl ${action.tagStyle}`}>{action.tag}</Badge>
                                        </Box>
                                        <Typography variant="body1" component="p">{action.context}</Typography>
                                        <Box 
                                            component="div" 
                                            className={`flex items-center font-medium pt-1 ${action.ctaStyle}`}
                                        >
                                            {action.ctaLabel}
                                            <Box component="span" className="opacity-0 group-hover:opacity-100 ml-0 group-hover:ml-2 transition-all">{getSVGIcon('arrow-right', 16)}</Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
