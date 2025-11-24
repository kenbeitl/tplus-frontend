import React from "react";

export function getLucideIcon(iconName: string): React.ReactNode {
    const pascalCase = iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    const icons = require('lucide-react');
    const IconComponent = icons[pascalCase] as React.ComponentType;
    return IconComponent ? <IconComponent /> : null;
}