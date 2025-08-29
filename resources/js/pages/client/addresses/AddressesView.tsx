import AddressItem from "@/components/AddressItem";
import NavLinkDashboard from "@/components/NavLinkDashboard";
import MainLayout from "@/layouts/MainLayout";
import userAddresses from "@/routes/user-addresses";
import { UserAddress } from "@/schemas";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

type AddressesViewProps = {
    addresses: UserAddress[];
}

export default function AddressesView({ addresses }: AddressesViewProps) {

    return (
        <MainLayout
            title="Direcciones de Envíos"
            subtitle="Aquí puedes ver todas tus direcciones de envíos."
        >
            <NavLinkDashboard
                href={userAddresses.create()}
            >
                <PlusIcon className="size-6" />
                Agregar Dirección
            </NavLinkDashboard>

            {addresses.length === 0 ? (
                <p className="text-gray-400 my-20 text-center text-lg">
                    No tienes ninguna dirección registrada. {''}
                    <Link className="text-cyan-600 hover:underline" href={userAddresses.create()}>
                        Crear una ahora.
                    </Link>
                </p>
            ) : (
                <div className="mt-10 grid grid-cols-1 gap-4">
                    {addresses.map(address => (
                        <AddressItem key={address.id} address={address} />
                    ))}
                </div>
            )}
        </MainLayout>
    )
}

