import React from 'react';

export default function ServiceLayout({ 
    children 
}: Readonly<{ 
    children: React.ReactNode 
}>) {
    return (
        <div className="p-4 sm:p-6">
            {children}
        </div>
    );
}