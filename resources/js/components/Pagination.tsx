import { Pagination as PaginationType } from "@/schemas";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { useMemo } from "react";


type PaginationProps = {
    pagination: PaginationType;
}

export default function Pagination({ pagination }: PaginationProps) {
    const pages = useMemo(() => Array.from({ length: pagination.last_page }, (_, index) => index + 1), [pagination])

    return pagination.last_page > 1 && (
        <div className="mt-10">
            <div className="flex items-center justify-center gap-2">
                <Link
                    disabled={pagination.current_page <= 1}
                    as="button"
                    href="?page=1"
                    className="bg-cyan-600 text-white p-2 rounded shadow-lg hover:bg-cyan-700 transition-colors cursor-pointer disabled:opacity-25"
                >
                    <ChevronDoubleLeftIcon className="size-6" />
                </Link>

                <Link
                    disabled={pagination.current_page <= 1}
                    as="button"
                    href={`?page=${pagination.current_page - 1}`}
                    className="bg-cyan-600 text-white p-2 rounded shadow-lg hover:bg-cyan-700 transition-colors cursor-pointer disabled:opacity-25"
                >
                    <ChevronLeftIcon className="size-6" />
                </Link>

                {pages.map(page => (
                    <Link
                        key={page}
                        disabled={pagination.current_page === page}
                        as="button"
                        href={`?page=${page}`}
                        className="bg-cyan-600 text-white py-2 px-4 font-bold rounded shadow-lg hover:bg-cyan-700 transition-colors cursor-pointer disabled:opacity-25 hidden md:block"
                    >
                        {page}
                    </Link>
                ))}

                <Link
                    disabled={pagination.current_page >= pagination.last_page}
                    as="button"
                    href={`?page=${pagination.current_page + 1}`}
                    className="bg-cyan-600 text-white p-2 rounded shadow-lg hover:bg-cyan-700 transition-colors cursor-pointer disabled:opacity-25"
                >
                    <ChevronRightIcon className="size-6" />
                </Link>

                <Link
                    disabled={pagination.current_page >= pagination.last_page}
                    as="button"
                    href={`?page=${pagination.last_page}`}
                    className="bg-cyan-600 text-white p-2 rounded shadow-lg hover:bg-cyan-700 transition-colors cursor-pointer disabled:opacity-25"
                >
                    <ChevronDoubleRightIcon className="size-6" />
                </Link>
            </div>

        </div>
    )
}
