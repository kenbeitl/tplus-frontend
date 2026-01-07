'use client';

import { Box, Button, Paper, Typography } from "@mui/material";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Tag from "./Tag";
import Emoji from "./Emoji";

export default function Carousel({ slideNum }: { slideNum: number }) {
    return (
        <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            // autoplay
            spaceBetween={8}
            slidesPerView={1}
            style={{
                "--swiper-pagination-color": "#FFFFFF",
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
            } as React.CSSProperties}
        >
        {new Array(slideNum).fill(null).map((_, index) => (
            <SwiperSlide key={index}>
                <Paper 
                    elevation={3}
                    className="bg-overlay-heavy"
                    sx={{
                        // padding: 6,
                        height: '100%',
                        borderRadius: 1,
                        background: `url('/slide-${index+1}.webp') center / cover no-repeat`,
                    }}
                >
                    <Box className="flex items-center mb-5">
                        <Emoji symbol="🍀" size={40} className="mr-1" />
                        <Tag label="Business" variant="outlined" className="text-base!" />
                    </Box>
                    <Typography variant="h4" component="h2" color="white" className="mb-2">Single Submission for Dual Declaration Service</Typography>
                    <Typography variant="body1" component="p" color="white" className="mb-3">Streamline your customs declarations with our intelligent dual submission system</Typography>
                    <Button
                        className="w-auto" 
                        variant="gradient" 
                        color="blue"
                    >Apply Now</Button>
                    <Tag label="Sponsored" className="tag absolute top-4 right-4" />
                </Paper>
            </SwiperSlide>
        ))} 
        </Swiper>
    )
}