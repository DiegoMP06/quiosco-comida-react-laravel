import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function NavLinkDashboard({ className, children, ...props }: InertiaLinkProps) {
    return (
        <Link
            className={`inline-flex justify-center items-center gap-2 border border-cyan-800 text-cyan-800 font-bold px-4 py-2 hover:bg-gray-200 transition-colors rounded ${className}`}
            {...props}
        >
            {children}
        </Link>
    )
}
