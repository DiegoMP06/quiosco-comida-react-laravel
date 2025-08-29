import { Auth } from "@/types";
import { Dialog, DialogPanel } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { type Category } from "../schemas";

type MainMobileMenuProps = {
    categories: Category[];
};

export default function MainMenuMobile({ categories }: MainMobileMenuProps) {
    const { user } = usePage().props.auth as Auth;

    return (
        <Dialog open={false} onClose={() => { }} className="md:hidden relative z-50">
            <div className="fixed inset-0 bg-white/50 flex justify-end">
                <DialogPanel className="max-w-lg w-2/3 px-4 py-6 bg-white overflow-y-auto">
                    <picture className="block mb-6">
                        <img src="/logo.png" alt="Logotipo de FreshCoffee" className="block max-w-52 w-full" />
                    </picture>

                    <p className="text-xl my-6">
                        Hola: {''}
                        <span className="font-bold">
                            {user?.name}
                        </span>
                    </p>

                    <div className="my-6">
                        {/* {categories.map((category) => (
                            <CategoryLink key={category.id} category={category} />
                        ))} */}
                    </div>

                    <button
                        className="my-6 block w-full bg-red-500 hover:bg-red-600 px-4 py-2 transition-colors text-white font-bold truncate uppercase"
                        title="Cancelar Orden"
                    >
                        Cancelar Orden
                    </button>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
