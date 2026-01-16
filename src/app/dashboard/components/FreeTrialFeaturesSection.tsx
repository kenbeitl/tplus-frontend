'use client';

import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { getSVGIcon } from '@/helpers/utils';
import { useRouter } from 'next/navigation';
import { Emoji, StyledIcon } from '@/components';

interface Feature {
    icon: string;
    iconStyle: string;
    title: string;
    context: string;
    cardStyle: string;
    linkStyle: string;
    list?: Array<{ label: string; link: string }>;
}

interface Remarks {
    title: string;
    body: string;
    ctaLabel: string;
}

interface FreeTrialFeaturesSectionProps {
    title: string;
    context: string;
    features: Feature[];
    remarks: Remarks;
    viewSubscriptionPlansText?: string;
}

export default function FreeTrialFeaturesSection({ 
    title, 
    context, 
    features, 
    remarks,
    viewSubscriptionPlansText
}: FreeTrialFeaturesSectionProps) {

    const router = useRouter();

    return (
        <Box component="div" className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-100 via-teal-50 to-green-100 p-6 border-2 border-emerald-200">
          <Box component="div" className="relative">
            
            <Box component="div" className="flex items-center gap-3 mb-5">
              <Box component="div" className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-emerald-600 to-teal-700 rounded-xl shadow-lg">
                { getSVGIcon('check-circle', 24, theme.palette.text.white) }
              </Box>
              <Box component="div">
                <Typography variant="h5" component="h2" className="font-bold!" color={theme.palette.text.lightGreen}>{title}</Typography>
              </Box>
            </Box>

            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {Array.isArray(features) && features.map((feature, featureIndex) => (
                <Box component="div" 
                  className={`group/parent border-2 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer bg-white rounded-xl p-5 ${feature.cardStyle}`} 
                  key={`features-${featureIndex}`}
                >
                    <Box component="div" className="flex items-center mb-3">
                        <StyledIcon 
                          icon={getSVGIcon(feature.icon, 28, theme.palette.text.white)} 
                          size={56} 
                          bgGradient={feature.iconStyle}
                          square
                          className="shrink-0 group-hover/parent:scale-110 group-hover/parent:rotate-3 transition-transform duration-300"
                        />
                        <Box component="div" className="ml-4">
                          <Typography variant="h6" component="h3" className="font-bold!">{ feature.title }</Typography>
                          <Typography variant="caption" component="p">{ feature.context }</Typography>
                        </Box>
                    </Box>
                    <ul>
                        {Array.isArray(feature.list) && feature.list.map((item, idx) => (
                          <li 
                            className={`relative group/item flex items-center space-x-2 cursor-pointer transition-colors rounded-lg border border-transparent ${feature.linkStyle}`}
                            onClick={() => router.push(item.link)}
                            key={`feature-${featureIndex}-item-${idx}`}
                          >
                            <Box component="span">{getSVGIcon('dot', 40)}</Box>
                            <Typography variant="subtitle2">{item.label}</Typography>
                            <Box component="span" className="absolute right-1 group-hover/item:right-0.5 opacity-0 group-hover/item:opacity-100 transition-all">{getSVGIcon('arrow-right', 16)}</Box>
                          </li>
                        ))}
                    </ul>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
    );
}
