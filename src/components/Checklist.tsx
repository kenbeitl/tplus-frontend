'use client';

import theme from '@/theme/theme';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { getSVGIcon } from '@/helpers/utils';

interface ChecklistProps {
    items: string[];
}

export default function Checklist({ items }: ChecklistProps) {
    return (
        <List className="grow">
            {items.map((text, index) => (
                <ListItem key={index}>
                    <ListItemIcon>
                        <Box component="span" className="p-0.5 rounded-3xl bg-green-100">{ getSVGIcon('circle-check-big', 16, theme.palette.icon.green) }</Box>
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    );
}