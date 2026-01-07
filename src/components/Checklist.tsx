'use client';

import theme from '@/theme/theme';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
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
                        { getSVGIcon('circle-check-big', 16, theme.palette.icon.green) }
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    );
}