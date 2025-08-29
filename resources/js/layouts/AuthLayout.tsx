import { Head, Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

type AuthLayoutProps = PropsWithChildren<{
    title: string;
    subtitle: string;
}>

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <>
            <Head title={title} />

            <div className="flex flex-col py-16 px-4  mx-auto max-w-2xl w-full">
                <Link href="/" title="Ir a Inicio" className="max-w-96 mx-auto mb-16">
                    <img src="/logo.png" alt="Imagen de Logo" className="block w-full" />
                </Link>

                <div className="flex-1">
                    <h1 className="font-bold text-4xl mb-2 text-cyan-600 text-center">
                        {title}
                    </h1>

                    <p className="text-gray-400 text-lg mb-10 text-center">
                        {subtitle}
                    </p>

                    <main className="grid grid-cols-1 gap-4">
                        {children}
                    </main>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}
