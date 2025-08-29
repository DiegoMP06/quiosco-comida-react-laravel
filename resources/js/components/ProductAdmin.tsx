import ProductStatusController from "@/actions/App/Http/Controllers/Admin/ProductStatusController";
import { edit } from "@/routes/products";
import storage from "@/routes/storage";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CheckIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { formatCurrency } from "../helpers";
import { Product } from "../schemas";

type Props = {
    product: Product;
}

export default function ProductAdmin({ product }: Props) {
    const [pending, setPending] = useState(false);

    const handleClickAvailable = () => {
        setPending(true);
        router.post(ProductStatusController(product.id), {}, {
            preserveScroll: true,
            onSuccess() {
                toast.success('El producto se actualizo exitosamente');
            },
            onError(errors) {
                Object.values(errors).forEach((error) => toast.error(error));
            },
            onFinish: () => setPending(false)
        });
    }

    const isAvailable = useMemo(() => product.available === 1, [product]);

    return (
        <div className="shadow-lg bg-white flex flex-col border border-gray-300">
            <img
                src={storage.local({ path: `products/${product.image}` }).url}
                alt={`imagen del producto ${product.name}`}
                width={500}
                height={600}
                className="w-full h-auto"
            />

            <div className="p-6 flex gap-6 justify-between flex-1">
                <div className="flex-1 space-y-2 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-700 flex-1" title={product.name}>
                        {product.name}
                    </h3>

                    <p className="text-4xl font-bold text-cyan-600">
                        {formatCurrency(Number(product.price))}
                    </p>

                    <div className={`text-xs rounded p-1.5 border font-bold text-center ${isAvailable ? 'text-green-700 bg-green-100 border-green-700': 'text-red-700 bg-red-100 border-red-700'}`}>
                        {product.available ? 'Disponible': 'No Disponible'}
                    </div>
                </div>

                <div>
                    <Menu>
                        <MenuButton
                            className="rounded p-1.5 text-gray-600 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-gray-400 data-hover:bg-gray-100 data-open:bg-gray-100 transition-colors cursor-pointer"
                            title="Opciones"
                        >
                            <EllipsisVerticalIcon className="size-8" />
                        </MenuButton>

                        <MenuItems
                            transition
                            anchor="bottom end"
                            className="w-52 origin-top-right rounded border border-gray-300 bg-white p-1 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 divide-y divide-gray-300"
                        >
                            <MenuItem>
                                <Link
                                    href={edit(product.id)}
                                    className="group flex w-full items-center gap-2 rounded px-3 py-1.5 data-focus:bg-gray-100 hover:bg-gray-100 transition-colors cursor-pointer text-gray-600"
                                >
                                    <PencilIcon className="size-4" />
                                    Editar
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    type="button"
                                    onClick={handleClickAvailable}
                                    disabled={pending}
                                    className="group flex w-full items-center gap-2 rounded px-3 py-1.5 data-focus:bg-gray-100 hover:bg-gray-100 transition-colors cursor-pointer text-gray-600"
                                >
                                    {isAvailable ? (
                                        <>
                                            <XMarkIcon className="size-4" />
                                            Sin stock
                                        </>
                                    ) : (
                                        <>
                                            <CheckIcon className="size-4" />
                                            Disponible
                                        </>
                                    )}
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    type="button"
                                    disabled={pending}
                                    className="group flex w-full items-center gap-2 rounded px-3 py-1.5 data-focus:bg-gray-100 hover:bg-gray-100 transition-colors cursor-pointer text-red-600"
                                >
                                    <TrashIcon className="size-4" />
                                    Eliminar
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    )
}
