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
                        <CircleCheckBig size={16} color="#43A047" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    );
}