import React from "react";

export default function InlineTag({ label }: { label: string }): React.ReactNode {
    return (
        <span className="tag">{label}</span>
    )
}