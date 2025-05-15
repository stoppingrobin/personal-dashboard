import * as React from 'react';


function DateArrow({ className, type, ...props }: React.ComponentProps<'button'>) {
    return (
        <button
            type={type}
            data-slot="input"
            className={'text-sm px-3 py-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 transition ' + className}
            {...props}
        />
    );
}

export { DateArrow };
