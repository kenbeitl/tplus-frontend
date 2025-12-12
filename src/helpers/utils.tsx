import { SvgIcon } from "@mui/material";
import React from "react";

type IconSource = 'lucide' | 'custom';

const iconComponentCache = new Map<string, React.ComponentType<{ size?: number, color?: string }>>();
const renderedIconCache = new Map<string, React.ReactNode>();

export function getSVGIcon(iconName: string, size: number = 25, color?: string, source: IconSource = 'lucide'): React.ReactNode {
    const cacheKey = `${iconName}-${size}-${color || 'default'}`;
    
    if (renderedIconCache.has(cacheKey)) {
        return renderedIconCache.get(cacheKey)!;
    }
    
    const componentCacheKey = `${iconName}-${source}`;
    let IconComponent = iconComponentCache.get(componentCacheKey);
    
    if (!IconComponent) {
        const pascalCase = iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');

        if (source === 'lucide') {
            const icons = require('lucide-react');
            IconComponent = icons[pascalCase] as React.ComponentType<{ size?: number, color?: string }>;
        } else {
            const icon = require(`../assets/icons/${pascalCase}.svg`).default;
            IconComponent = ({ size, color }: { size?: number, color?: string }) => (
                <SvgIcon 
                    component={icon} 
                    viewBox="0 0 24 24"
                    sx={{ 
                    fontSize: size, 
                    color: color 
                    }} 
                />
            );
        }
        
        if (IconComponent) {
            iconComponentCache.set(iconName, IconComponent);
        } else {
            return null;
        }
    }
    
    const renderedIcon = <IconComponent size={size} color={color} />;
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