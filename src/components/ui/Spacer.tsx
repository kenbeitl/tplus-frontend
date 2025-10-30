import { Box } from '@mui/material';

interface SpacerProps {
    height?: number | string;
}

export default function Spacer({ height = 16 }: SpacerProps) {
    return <Box sx={{ height }} />;
}
