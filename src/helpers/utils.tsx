import React from "react";

export function getLucideIcon(iconName: string): React.ReactNode {
    const pascalCase = iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    const icons = require('lucide-react');
    const IconComponent = icons[pascalCase] as React.ComponentType;
    return IconComponent ? <IconComponent /> : null;
}

export function substituteSlot(search: string, slot: string, value: string | React.ReactNode): React.ReactNode {
    let chunks = search.split(slot);
    if (chunks.length > 1) {
        return chunks.map((chunk, index) => {
            return (
                <React.Fragment key={index}>
                    {chunk}
                    {index < chunks.length - 1 && value}
                </React.Fragment>
            )
        });
    }
    return search;
}