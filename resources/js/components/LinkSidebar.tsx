import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function LinkSidebar({ className, children, ...props }: InertiaLinkProps) {
    return (
        <Link className={`text-gray-600 text-lg font-bold px-4 py-2 hover:text-white hover:bg-cyan-600 transition-colors flex gap-2 items-center truncate w-full ${className}`} {...props}>
            {children}
        </Link>
    )
}

