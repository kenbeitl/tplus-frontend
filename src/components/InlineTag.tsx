import React from "react";

export default function InlineTag({ 
    variant = '',
    label,
    className = '',
    startIcon,
    endIcon,
}: { 
    variant?: string, 
    label: string,
    className?: string,
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode
}): React.ReactNode {
    return (
        <span className={`tag ${variant ? 'tag-'+variant : ''} ${className}`.trim()}>
            { startIcon && <span className="mr-1">{ startIcon }</span> }
            { label }
            { endIcon && <span className="ml-1">{ endIcon }</span> }
        </span>
    )
}