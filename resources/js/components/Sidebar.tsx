import { destroy } from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";
import { Auth } from "@/types";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";


export default function Sidebar({ children }: PropsWithChildren) {
    const { user } = usePage().props.auth as Auth;

    return (
        <aside className="hidden md:flex md:w-64 lg:w-60 xl:w-80 2xl:w-96 py-6 overflow-y-auto bg-white border-r border-gray-300 shadow-lg md:flex-col md:gap-6">
            <div className="px-4">
                <picture className="block mb-6">
                    <img
                        src="/logo.png"
                        alt="Logotipo de FreshCoffee"
                        className="block max-w-52 w-full"
                        width={500}
                        height={50}
                    />
                </picture>

                <p className="text-xl text-gray-600">
                    Hola: {''}
                    <span className="font-bold">
                        {user.name}
                    </span>
                </p>
            </div>

            <nav className="flex-1 divide-y divide-gray-300">
                {children}
            </nav>

            <div className="px-4">
                <Link
                    className="bg-cyan-950 hover:bg-cyan-900 transition-colors text-white font-bold px-4 py-2 mt-6 flex w-full rounded items-center justify-center gap-2 cursor-pointer"
                    title="Cerrar Sesión"
                    as="button"
                    href={destroy()}
                >
                    Cerrar Sesión
                    <ArrowRightStartOnRectangleIcon className="size-6" />
                </Link>
            </div>
        </aside>
    )
}
