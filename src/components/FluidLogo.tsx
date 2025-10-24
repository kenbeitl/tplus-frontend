import Image from 'next/image';
import { Box, SxProps, Theme } from "@mui/material";

interface FluidLogoProps {
    width?: number;
    height?: number;
    alt?: string;
    sx?: SxProps<Theme>;
    priority?: boolean;
    className?: string;
}

export default function FluidLogo({ 
    width, 
    height, 
    alt = "",
    priority = false,
    className = ""
}: FluidLogoProps) {
    return (
        <Box 
            className={className}
        >
            <Image 
                src="/logo-T-Plus.svg" 
                alt={alt} 
                width={width || 0}
                height={height || 0}
                priority={priority}
            />
        </Box>
    )
}