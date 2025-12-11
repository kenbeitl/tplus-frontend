import theme from "@/theme/theme";
import { useMediaQuery } from "@mui/material";

const breakpointLabels = ['sm', 'md', 'lg'] as const;
type Breakpoint = typeof breakpointLabels[number];

const breakpointMap = {
    sm: theme.breakpoints.up('sm'),
    md: theme.breakpoints.up('md'),
    lg: theme.breakpoints.up('lg'),
}

const deviceToBreakpoint: Record<string, Breakpoint> = {
    mobile: 'sm',
    tablet: 'md',
    desktop: 'lg'
}

export function useBreakpoint(size: Breakpoint | string): boolean {
    const breakpointSize = deviceToBreakpoint[size] || size;
    if (!breakpointLabels.includes(breakpointSize as Breakpoint)) {
        throw new Error(`Invalid breakpoint size: ${size}`);
    }
    return useMediaQuery(breakpointMap[breakpointSize]);
}