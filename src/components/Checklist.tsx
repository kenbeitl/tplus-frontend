'use client';

import theme from '@/theme/theme';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { getSVGIcon } from '@/helpers/utils';

interface ChecklistProps {
    iconColor?: string;
    items: string[];
    stylish?: boolean;
}

export default function Checklist({ iconColor = theme.palette.icon.green, items, stylish = false }: ChecklistProps) {
    return (
        <List dense>
            {items.map((text, index) => (
                <ListItem key={index}>
                    <ListItemIcon>
                        <Box component="span" className={stylish ? `p-0.5 rounded-3xl bg-green-100` : ''}>
                            { getSVGIcon('circle-check-big', 16, theme.palette.icon.green) }
                        </Box>
                    </ListItemIcon>
                    <ListItemText primary={text} slotProps={{ primary: { sx: { fontSize: '14px'} } }} />
                </ListItem>
            ))}
        </List>
    );
}