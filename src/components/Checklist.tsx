import theme from '@/theme/theme';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CircleCheckBig } from 'lucide-react';

interface ChecklistProps {
    items: string[];
}

export default function Checklist({ items }: ChecklistProps) {
    return (
        <List sx={{ flexGrow: 1 }}>
            {items.map((text, index) => (
                <ListItem key={index}>
                    <ListItemIcon>
                        <CircleCheckBig size={16} color={theme.palette.icon.green} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    );
}