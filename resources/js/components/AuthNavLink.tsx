import { InertiaLinkProps, Link } from '@inertiajs/react'
import React from 'react'

export default function AuthNavLink({ className, children, ...props }: InertiaLinkProps) {
    return (
        <Link className={`text-gray-400 hover:text-gray-500 hover:underline block text-lg text-center ${className}`} {...props}>
            {children}
        </Link>
    )
}

