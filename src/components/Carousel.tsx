'use client';

import { Box, Button, Icon, Paper, Typography } from "@mui/material";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import InlineTag from "./InlineTag";

export default function Carousel({ slideNum }: { slideNum: number }) {
    return (
        <Swiper
            modules={[Navigation]}
            navigation
            loop
            spaceBetween={16}
            slidesPerView={1}
        >
        {new Array(slideNum).fill(null).map((_, index) => (
            <SwiperSlide key={index} className="px-2">
                <Paper 
                    elevation={3}
                    className="bg-overlay-heavy"
                    sx={{
                        padding: 6,
                        height: '100%',
                        borderRadius: 1,
                        background: `url('/slide-${index+1}.webp') center / cover no-repeat`,
                    }}
                >
                    <Box className="flex items-center mb-5">
                        <Icon sx={{ width: 40, height: 40, fontSize: 30, mr: 1 }}>🍀</Icon>
                        <InlineTag label="Business" variant="outlined" className="!text-base" />
                    </Box>
                    <Typography variant="h4" component="h2" color="white" sx={{ mb: 2 }}>Single Submission for Dual Declaration Service</Typography>
                    <Typography variant="body1" component="p" color="white" sx={{ mb: 3 }}>Streamline your customs declarations with our intelligent dual submission system</Typography>
                    <Button
                        sx={{ width: 'auto' }} 
                        variant="gradient" 
                        color="blue"
                    >Apply Now</Button>
                    <InlineTag 
                        label="Sponsored"
                        className="absolute top-4 right-4"
                    />
                </Paper>
            </SwiperSlide>
        ))} 
        </Swiper>
    )
}