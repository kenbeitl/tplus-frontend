'use client';

import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { ActionButton, Emoji } from '@/components';
import { getSVGIcon } from '@/helpers/utils';

interface TBCFeature {
    icon: string;
    title: string;
    context: string;
}

interface Remarks {
    title: string;
    context: string;
    ctaLabel: string;
}

interface FeaturesTBCSectionProps {
    title: string;
    context: string;
    features: TBCFeature[];
    remarks: Remarks;
    moreFeatures: string;
    viewSubscriptionPlansText?: string;
}

export default function FeaturesTBCSection({ 
    title, 
    context, 
    features,
    remarks,
    moreFeatures,
    viewSubscriptionPlansText
}: FeaturesTBCSectionProps) {
    const router = useRouter();

    return (
        <Box component="div" className="relative overflow-hidden rounded-2xl bg-linear-to-br from-amber-100 via-orange-50 to-yellow-100 p-6 border-2 border-amber-200">
          <Box component="div" className="relative">
            
            <Box component="div" className="flex items-center gap-3 mb-5">
              <Box component="div" className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-orange-600 to-amber-600 rounded-xl shadow-lg">
                { getSVGIcon('calendar', 24, theme.palette.text.white) }
              </Box>
              <Box component="div">
                <Typography variant="h3" component="h2" color={theme.palette.text.orange}>
                  <Emoji symbol="🎁" size={50} sx={{ mr: 1 }} />
                  {title}
                </Typography>
                <Typography variant="body2" component="p">{context}</Typography>
              </Box>
            </Box>
            
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
              <CardContent className="p-6">
                <Box component="div" className="space-y-3">
                  {features.map(feature => {
                    return (
                      <Box component="div" key={feature.icon} className="p-4 bg-linear-to-r from-amber-100 to-orange-100 rounded-xl border-2 border-amber-300 hover:border-amber-400 transition-all hover:shadow-md">
                        <Box component="div" className="flex items-start space-x-3">
                          <Box component="div" className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md shrink-0">
                            { getSVGIcon(feature.icon, 24, '#FFFFFF') }
                          </Box>
                          <Box component="div" className="flex-1">
                            <Typography variant="h5" component="h4">{feature.title}</Typography>
                            <Typography variant="body1" component="p">{feature.context}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                
                <Box component="div" className="mt-5 p-4 bg-linear-to-r from-orange-50 to-amber-50 border-2 border-amber-200 rounded-xl text-center">
                  <Typography variant="h6" component="h4" sx={{ fontWeight: 400 }}>
                    <Emoji symbol="📅" size={25} sx={{ mr: 1 }} />  
                    { moreFeatures }
                  </Typography>
                </Box>
                
                <Box component="div" className="mt-4 relative overflow-hidden rounded-xl bg-linear-to-r from-orange-600 to-amber-600 p-5 shadow-lg">
                  <Box component="div" className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                    <Box component="div" className="text-white">
                        <Typography variant="h5" component="h4">{ remarks.title }</Typography>
                        <Typography variant="body1" component="p">{ remarks.context }</Typography>
                    </Box>
                    <ActionButton
                        color="orange"
                        buttonText={ viewSubscriptionPlansText as string }
                        endIcon={getSVGIcon('arrow-right', 16)}
                        variant="outlined"
                        onClick={() => router.push('/subscriptions')}
                        autoWidth
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>

        </Box>
    </Box>
    );
}
