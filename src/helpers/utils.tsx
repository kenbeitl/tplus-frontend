import { SvgIcon } from "@mui/material";
import React from "react";

const iconComponentCache = new Map<string, React.ComponentType<{ size?: number, color?: string, fill?: string }>>();
const renderedIconCache = new Map<string, React.ReactNode>();

export function getSVGIcon(iconName: string, size: number = 25, color?: string, fill?: string): React.ReactNode {
    const cacheKey = `${iconName}-${size}-${color || 'default'}-${fill || 'none'}`;
    
    if (renderedIconCache.has(cacheKey)) {
        return renderedIconCache.get(cacheKey)!;
    }
    
    let IconComponent = iconComponentCache.get(iconName);
    
    if (!IconComponent) {
        const pascalCase = iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
        try {
            const icon = require(`../assets/icons/${pascalCase}.svg`).default;
            IconComponent = ({ size, color, fill }: { size?: number, color?: string, fill?: string }) => (
                <SvgIcon 
                    component={icon} 
                    viewBox="0 0 24 24"
                    sx={{ 
                        fontSize: size, 
                        color: color,
                        fill: fill 
                    }} 
                />
            );
        } catch (e) {
            const icons = require('lucide-react');
            IconComponent = icons[pascalCase] as React.ComponentType<{ size?: number, color?: string, fill?: string }>;
        }
        
        if (IconComponent) {
            iconComponentCache.set(iconName, IconComponent);
        } else {
            return null;
        }
    }
    
    const iconProps: { size?: number; color?: string; fill?: string } = { size, color };
    if (fill) {
        iconProps.fill = fill;
    }
    
    const renderedIcon = <IconComponent {...iconProps} />;
    renderedIconCache.set(cacheKey, renderedIcon);
    
    return renderedIcon;
}

export function clearIconCache() {
    iconComponentCache.clear();
    renderedIconCache.clear();
}

export function subSlot(search: string, slot: string, value: string | number | React.ReactNode): React.ReactNode {
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

export function getLocalDateString(dateString: string, locale: string = 'en-US'): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function getLocalCurrency(amount: number, locale: string = 'zh-HK', currency: string = 'HKD'): string {
    let localeOpt: Intl.NumberFormatOptions = {
        // no decimal places 
        style: 'currency', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0, 
    };
    if (currency) localeOpt = { ...localeOpt, currency };

    return amount.toLocaleString(locale, localeOpt);
}

export function toHyphenCase(pascalString: string): string {
    return pascalString.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function toPascalCase(hyphenString: string): string {
    return hyphenString.split('-').map((word, i) => i === 0 ? word : word[0].toUpperCase() + word.slice(1)).join('');
}