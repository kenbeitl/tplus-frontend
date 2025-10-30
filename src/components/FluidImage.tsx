import Image from 'next/image';
import { Box, SxProps, Theme } from "@mui/material";

interface FluidImageProps {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
    sx?: SxProps<Theme>;
    priority?: boolean;
    className?: string;
}

export default function FluidImage({
    src,
    width, 
    height, 
    alt = "",
    sx,
    priority = false,
    className = ""
}: FluidImageProps) {
    return (
        <Box 
            className={className}
            sx={sx}
        >
            <Image 
                src={src} 
                alt={alt} 
                width={width || 0}
                height={height || 0}
                priority={priority}
            />
        </Box>
    )
}