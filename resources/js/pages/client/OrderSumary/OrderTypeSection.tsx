import { store } from "@/actions/App/Http/Controllers/Client/OrderController";
import { useKioskStore } from "@/stores/kiosk";
import { Auth, DraftOrder } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import DeliveryFormSection from "./DeliveryFormSection";


export default function OrderTypeSection() {
    const [pending, setPending] = useState(false);
    const order = useKioskStore((state) => state.order);
    const total = useKioskStore((state) => state.total);
    const clearState = useKioskStore((state) => state.clearState);
    const setHomeDelivery = useKioskStore((state) => state.setHomeDelivery);
    const setUserAddressId = useKioskStore((state) => state.setUserAddressId);
    const home_delivery = useKioskStore((state) => state.home_delivery);
    const user_address_id = useKioskStore((state) => state.user_address_id);
    const { user } = usePage().props.auth as Auth;

    const handleCreateOrder = () => {
        const data: DraftOrder = {
            products: order.map(item => ({ product_id: item.id, quantity: item.quantity })),
            home_delivery,
            total,
            user_address_id,
        }

        setPending(true);

        router.post(store(), data, {
            onSuccess: () => {
                clearState();
            },
            onFinish: () => {
                setPending(false);
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error));
            }
        })
    }

    useEffect(() => {
        setUserAddressId(null);
    }, [home_delivery]);

    const canCreateOrder = useMemo(() => order.length > 0 && ((home_delivery && user_address_id) || !home_delivery), [order, home_delivery, user_address_id]);

    return (
        <div className="bg-white border border-gray-300 p-6 rounded shadow-lg flex-1 flex flex-col">
            <div className="flex-1">
                <h2 className="text-2xl text-cyan-600 font-bold">
                    Datos del Cliente: {''}
                </h2>

                <div className="p-2">
                    <p className="text-lg text-gray-600 font-bold">
                        Nombre: {''}
                        <span className="font-normal">
                            {user.name}
                        </span>
                    </p>

                    <p className="text-lg text-gray-600 font-bold">
                        Email: {''}
                        <span className="font-normal">
                            {user.email}
                        </span>
                    </p>
                </div>

                <div className="mt-4">
                    <h2 className="text-2xl font-bold text-cyan-600">
                        Tipo de Compra: {''}
                    </h2>

                    <form className="p-2 grid grid-cols-1">
                            <label
                                htmlFor={`type-local`}
                                className="flex gap-2 items-center text-gray-600 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="home_delivery"
                                    id={`type-local`}
                                    className="form-radio text-cyan-600"
                                    defaultChecked
                                    checked={!home_delivery}
                                    onChange={() => setHomeDelivery(false)}
                                />
                                Consumo en Local
                            </label>

                            <label
                                htmlFor={`type-delivery`}
                                className="flex gap-2 items-center text-gray-600 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="home_delivery"
                                    id={`type-delivery`}
                                    className="form-radio text-cyan-600"
                                    checked={home_delivery}
                                    onChange={() => setHomeDelivery(true)}
                                />
                                Servicio a Domicilio
                            </label>
                    </form>
                </div>

                {home_delivery && (
                    <DeliveryFormSection />
                )}
            </div>

            {canCreateOrder && (
                <button
                    className="bg-cyan-600 text-white text-lg font-bold px-4 py-2 hover:bg-cyan-700 transition-colors block w-full text-center rounded disabled:opacity-25 cursor-pointer"
                    type="button"
                    onClick={handleCreateOrder}
                    disabled={pending}
                >
                    Confirmar Pedido
                </button>
            )}
        </div>
    )
}

