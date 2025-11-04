import React from "react";

export default function InlineTag({ 
    variant = '',
    label,
    className = ''
}: { 
    variant?: string, 
    label: string,
    className?: string
}): React.ReactNode {
    return (
        <span 
            className={`tag${variant ? '-'+variant : ''} ${className}`.trim()}
        >{label}</span>
    )
}