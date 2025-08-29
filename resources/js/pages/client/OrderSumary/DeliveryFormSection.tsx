import UserAddressAPI from "@/api/UserAddressAPI";
import { useKioskStore } from "@/stores/kiosk";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import NewAddressFormModal from "./NewAddressFormModal";

export default function DeliveryFormSection() {
    const addressId = useKioskStore(state => state.user_address_id);
    const setUserAddressId = useKioskStore(state => state.setUserAddressId);
    const [showModal, setShowModal] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['user-addresses'],
        queryFn: UserAddressAPI.getAllAddresses,
    });

    const handleSelectAddress = (id: number) => {
        if (id === addressId) {
            setUserAddressId(null);
        } else {
            setUserAddressId(id);
        }
    }

    return (
        <div className="my-4">
            <h2 className="text-2xl text-cyan-600 font-bold">
                Direcciones: {''}
            </h2>

            {isLoading ? (
                <p className="my-20 text-center text-gray-600">
                    Cargando
                </p>
            ) : (
                <>
                    {data?.length === 0 ? (
                        <p className="my-20 text-center text-gray-600">
                            No tienes ninguna dirección registrada
                        </p>
                    ) : (
                        <ul className="grid grid-cols-1 my-2 gap-2" role="list">
                            {data?.map(address => (
                                <li
                                    key={address.id}
                                    className={`p-2 border rounded border-gray-300 cursor-pointer ${addressId === address.id ? 'bg-cyan-800' : 'bg-white'}`}
                                    role="listitem"
                                    onClick={() => handleSelectAddress(address.id)}
                                >
                                    <p className={`text-lg font-bold ${addressId === address.id ? 'text-white' : 'text-gray-600'}`}>
                                        {address.name}
                                    </p>
                                    <p className={`text-sm ${addressId === address.id ? 'text-cyan-100' : 'text-gray-600'}`}>
                                        {address.street} {address.number}, {address.colony}, {address.city}. {address.zip}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}

            <button
                type="button"
                className="inline-flex justify-center items-center gap-2 border border-cyan-800 text-cyan-800 font-bold px-4 py-2 hover:bg-gray-200 transition-colors rounded cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                <PlusIcon className="size-6" />
                Agregar Nueva
            </button>

            <NewAddressFormModal
                open={showModal}
                setOpen={setShowModal}
            />
        </div>
    )
}

