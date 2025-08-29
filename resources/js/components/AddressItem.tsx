import { destroy } from "@/actions/App/Http/Controllers/Client/UserAddressController";
import { edit, show } from "@/routes/user-addresses";
import { UserAddress } from "@/schemas";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowTopRightOnSquareIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type AddressItemProps = {
    address: UserAddress;
}

export default function AddressItem({ address }: AddressItemProps) {
    const queryClient = useQueryClient();
    const handleDeleteAddress = () => {
        Swal.fire({
            title: '¡Atención!',
            text: '¿Deseas Eliminar la dirección?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'No',
            showConfirmButton: true,
            confirmButtonText: 'Si',
        })
            .then((response) => {
                if (response.isConfirmed) {
                    router.delete(destroy(address.id), {
                        onSuccess: () => {
                            toast.success('La dirección se elimino exitosamente');
                            queryClient.invalidateQueries({ queryKey: ['user-addresses'] });
                        },
                        onError: (errors) => {
                            Object.values(errors).forEach((error) => toast.error(error))
                        }
                    })
                }
            })
    }

    return (
        <div className="bg-white p-6 border border-gray-300 rounded shadow-lg flex gap-6 justify-between">
            <div className="flex-1">
                <Link href={show(address.id)} className="text-2xl font-bold text-gray-600">
                    {address.name}
                </Link>

                <p className="text-gray-400">
                    {address.street} {address.number ? address.number : 'S/N'}, {address.colony}, {address.city}. {address.zip}
                </p>
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
                                href={show(address.id)}
                                className="group flex w-full items-center gap-2 rounded px-3 py-1.5 data-focus:bg-gray-100 hover:bg-gray-100 transition-colors cursor-pointer text-gray-600"
                            >
                                <ArrowTopRightOnSquareIcon className="size-4" />
                                Ver más
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                href={edit(address.id)}
                                className="group flex w-full items-center gap-2 rounded px-3 py-1.5 data-focus:bg-gray-100 hover:bg-gray-100 transition-colors cursor-pointer text-gray-600"
                            >
                                <PencilIcon className="size-4" />
                                Editar
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <button
                                onClick={handleDeleteAddress}
                                type="button"
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
    )
}
