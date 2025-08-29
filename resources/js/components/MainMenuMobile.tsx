import { destroy } from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";
import { useMenuMobileStore } from "@/stores/menuMobile";
import { Auth } from "@/types";
import { Dialog, DialogPanel } from "@headlessui/react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

type MainMobileMenuProps = PropsWithChildren;

export default function MainMenuMobile({ children }: MainMobileMenuProps) {
    const { user } = usePage().props.auth as Auth;
    const menu = useMenuMobileStore((state) => state.menu);
    const setMenu = useMenuMobileStore((state) => state.setMenu);

    return (
        <Dialog open={menu} onClose={() => setMenu(false)} className="md:hidden relative z-50">
            <div className="fixed inset-0 bg-white/50 flex justify-end">
                <DialogPanel
                    transition
                    className="max-w-lg w-2/3 px-4 py-6 bg-white overflow-y-auto data-closed:transform-[scale(95%)] data-closed:opacity-0 data-closed:translate-x-10 duration-300 ease-out"
                >
                    <picture className="block mb-6">
                        <img
                            src="/logo.png"
                            alt="Logotipo de FreshCoffee"
                            className="block max-w-52 w-full"
                            width={200}
                            height={50}
                        />
                    </picture>

                    <p className="text-xl my-6 text-gray-600">
                        Hola: {''}
                        <span className="font-bold">
                            {user.name}
                        </span>
                    </p>

                    <div className="my-6">
                        {children}
                    </div>

                    <Link
                        className="bg-cyan-950 hover:bg-cyan-900 transition-colors text-white font-bold px-4 py-2 mt-6 flex w-full rounded items-center justify-center gap-2 cursor-pointer"
                        title="Cerrar Sesión"
                        as="button"
                        href={destroy()}
                    >
                        Cerrar Sesión
                        <ArrowRightStartOnRectangleIcon className="size-6" />
                    </Link>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
