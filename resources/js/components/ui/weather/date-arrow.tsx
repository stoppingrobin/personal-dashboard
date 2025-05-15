import React from 'react';

interface DateArrowProps extends React.ComponentProps<'button'> {
    direction?: 'left' | 'right';
}

export default function DateArrow({ className, type, direction, ...props }: DateArrowProps) {
    return (
        <button
            type={type}
            data-slot="input"
            className={
                'text-sm px-3 py-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 transition ' + className
            }
            {...props}
        >
            {direction == "left" ? "← Prev" : "Next →"}
        </button>
    );
}