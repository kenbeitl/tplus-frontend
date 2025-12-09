import React from "react";

const iconComponentCache = new Map<string, React.ComponentType<{ size?: number, color?: string }>>();
const renderedIconCache = new Map<string, React.ReactNode>();

export function getLucideIcon(iconName: string, size: number = 25, color?: string): React.ReactNode {
    const cacheKey = `${iconName}-${size}-${color || 'default'}`;
    
    if (renderedIconCache.has(cacheKey)) {
        return renderedIconCache.get(cacheKey)!;
    }
    
    let IconComponent = iconComponentCache.get(iconName);
    
    if (!IconComponent) {
        const pascalCase = iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
        const icons = require('lucide-react');
        IconComponent = icons[pascalCase] as React.ComponentType<{ size?: number, color?: string }>;
        
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