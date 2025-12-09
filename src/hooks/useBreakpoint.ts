import theme from "@/theme/theme";
import { useMediaQuery } from "@mui/material";

const breakpointLabels = ['sm', 'md', 'lg'] as const;
type Breakpoint = typeof breakpointLabels[number];

const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
};

const breakpointMap = {
    sm: theme.breakpoints.up(breakpoints.mobile),
    md: theme.breakpoints.up(breakpoints.tablet),
    lg: theme.breakpoints.up(breakpoints.desktop),
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