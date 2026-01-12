'use client';

import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { getSVGIcon } from '@/helpers/utils';
import { useRouter } from 'next/navigation';
import { Emoji } from '@/components';

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
                <Typography variant="h2" component="h2" color={theme.palette.text.lightGreen}>
                  <Emoji symbol="🆓" size={50} sx={{ mr: 1 }} />
                  {title}
                </Typography>
                <Typography variant="body1" component="p">{context}</Typography>
              </Box>
            </Box>

            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {Array.isArray(features) && features.map((feature, featureIndex) => (
                <Box component="div" 
                  className={`group/parent border-2 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer bg-white rounded-xl p-5 ${feature.cardStyle}`} 
                  key={`features-${featureIndex}`}
                >
                    <Box component="div" className="pb-4">
                        <Box component="div" className={`h-14 w-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover/parent:rotate-3 transition-all ${feature.iconStyle}`}>
                            { getSVGIcon(feature.icon, 28, theme.palette.text.white) }
                        </Box>
                        <Typography variant="h4" component="h3">{ feature.title }</Typography>
                        <Typography variant="body2" component="p">{ feature.context }</Typography>
                    </Box>
                    <ul className="space-y-3 text-sm">
                        {Array.isArray(feature.list) && feature.list.map((item, idx) => (
                          <li 
                            className={`group/item flex items-center space-x-3 cursor-pointer transition-colors p-2 rounded-lg ${feature.linkStyle}`}
                            onClick={() => router.push(item.link)}
                            key={`feature-${featureIndex}-item-${idx}`}
                          >
                            <Box component="span" className="relative group-hover/item:translate-x-2 transition-transform">{getSVGIcon('arrow-right', 16)}</Box>
                            <Typography variant="h6">{item.label}</Typography>
                          </li>
                        ))}
                    </ul>
                </Box>
              ))}
            </Box>

            <Box component="div" className="mt-5 relative overflow-hidden rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 p-5 shadow-lg">
              <Box component="div" className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                <Box component="div" className="flex items-start gap-3 text-white">
                  <Box component="div" className="shrink-0 mt-0.5">
                    { getSVGIcon('check-circle', 20, theme.palette.text.white) }
                  </Box>
                  <Box component="div">
                    <Typography variant="h5" component="h4">{ remarks.title }</Typography>
                    <Typography variant="body1" component="p">{ remarks.body }</Typography>
                  </Box>
                </Box>
                <Button
                  color="success"
                  endIcon={getSVGIcon('arrow-right', 16)}
                  variant="outlined"
                  onClick={() => router.push('/subscriptions')}
                  sx={{ width: 'auto' }}
                >
                  {viewSubscriptionPlansText}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
    );
}
