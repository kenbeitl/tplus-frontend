'use client';

import { Box, Button, Paper, Typography } from "@mui/material";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Emoji from "./Emoji";
import theme from "@/theme/theme";
import { getSVGIcon } from "@/helpers/utils";
import Tag from "./Tag";
import { useTranslations } from "@/contexts/AppContext";

interface SlideProps {
    isSponsor?: boolean;
    emoji: string;
    tag?: string;
    title: string;
    context: string;
    buttonText: string;
    buttonLink: string;
    buttonStyle?: string;    
}

export default function Carousel({ 
    slides, 
    slideLayout = 1,
}: { 
    slides: SlideProps[], 
    slideLayout?: number,
}) {
    const router = useRouter();
    const t = useTranslations();
    
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
            // autoplay={{ delay: 5000 }}
            spaceBetween={8}
            slidesPerView={1}
            className="shadow-lg"
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
                    className="bg-grey-900" // background image placeholder
                    sx={{
                        paddingTop: 6,
                        paddingRight: 12,
                        paddingBottom: 6,
                        paddingLeft: 12,
                        height: '100%',
                        minHeight: '200px',
                        borderRadius: 1,
                        backgroundColor: theme.palette.background.darkGrey,
                    }}
                >   
                    { slide.isSponsor &&
                        <Tag variant="white" label={ t("common.sponsored") } className="inline! absolute! right-3! top-3!" /> 
                    }
                    <Box component="div" className="flex flex-col md:flex-row items-center">
                        { slideLayout === 1 &&
                            <>
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
                            </>                            
                        }
                        { slideLayout === 2 && 
                            <>                                  
                                <Box component="div" className="flex flex-col gap-2">
                                    <Box component="div" className="flex items-center">
                                        <Emoji symbol={slide.emoji} size={48} className="mr-1" />
                                        <Tag variant="outlined" label={ slide.tag || '' } />
                                    </Box>
                                    <Typography variant="h2" component="h2" color="white">{slide.title}</Typography>
                                    <Typography variant="body1" component="p" color="white">{slide.context}</Typography>
                                    <Button
                                        className={`bg-linear-to-r ${slide.buttonStyle} text-white! w-fit border-0!`}
                                        variant="contained"
                                        onClick={() => handleClick(slide.buttonLink)}
                                        endIcon={ getSVGIcon('external-link', 16, '#FFFFFF') }
                                    >
                                        {slide.buttonText}
                                    </Button>
                                </Box>
                            </>
                        }
                    </Box>
                    
                </Paper>
            </SwiperSlide>
        ))} 
        </Swiper>
    )
}