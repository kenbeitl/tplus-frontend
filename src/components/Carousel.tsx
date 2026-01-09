'use client';

import { Box, Button, Paper, Typography } from "@mui/material";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Emoji from "./Emoji";
import theme from "@/theme/theme";
import { getSVGIcon } from "@/helpers/utils";

interface SlideProps {
    emoji: string;
    title: string;
    context: string;
    buttonText: string;
    buttonLink: string;
}

export default function Carousel({ 
    slides, 
    isPayConnect = false
}: { 
    slides: SlideProps[], 
    isPayConnect?: boolean
}) {
    const router = useRouter();
    
    const handleClick = (link: string) => {
        if (link.trim() === '#') return;

        if (link.startsWith('http')) {
            window.open(link, '_blank');
        } else {
            router.push(link);
        }
    };
    
    return (
        <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            autoplay={{ delay: 5000 }}
            spaceBetween={8}
            slidesPerView={1}
            style={{
                "--swiper-pagination-color": "#FFFFFF",
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
            } as React.CSSProperties}
        >
        {slides.map((slide, index) => (
            <SwiperSlide key={index}>
                <Paper 
                    elevation={3}
                    className="bg-overlay-heavy"
                    sx={{
                        paddingTop: 6,
                        paddingRight: 12,
                        paddingBottom: 6,
                        paddingLeft: 12,
                        height: '100%',
                        minHeight: isPayConnect ? '300px' : '200px',
                        borderRadius: 1,
                        backgroundColor: theme.palette.background.darkGrey,
                    }}
                >
                    <Box component="div" className="flex flex-col md:flex-row items-center">
                        <Box component="div" className="flex flex-col justify-between grow mb-5 md:mr-6 md:mb-0">
                            <Box className="flex flex-col md:flex-row md:items-center mb-5">
                                <Emoji symbol={slide.emoji} size={48} className="mr-1" />
                                <Typography variant="h1" component="h2" color="white" className="mb-2">{slide.title}</Typography>    
                            </Box>                    
                            <Typography variant="h5" component="p" color="white" sx={{ fontWeight: 400 }}>{slide.context}</Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            color="white"
                            endIcon={getSVGIcon('arrow-right', 20, theme.palette.text.primary)}
                            className="whitespace-nowrap px-10!"
                            onClick={() => handleClick(slide.buttonLink)}
                        >{slide.buttonText}</Button>
                    </Box>
                </Paper>
            </SwiperSlide>
        ))} 
        </Swiper>
    )
}