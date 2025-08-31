import { update } from "@/actions/App/Http/Controllers/Client/OrderController";
import { Order } from "@/schemas";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
import OrderData from "./OrderData";

type OrderAdminProps = {
    order: Order;
    handleOpenModal: (orderId: Order['id']) => void
}

export default function OrderAdmin({ order, handleOpenModal }: OrderAdminProps) {
    const [pending, setPending] = useState(false);

    const handleUpdateStatus = (status: number) => {
        setPending(true);
        router.patch(update({ order: order.id }), { status }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('El estatus del pedido se actualizo exitosamente')
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error))
            },
            onFinish: () => setPending(false)
        })
    }

    return (
        <>
            <div className="bg-white shadow-lg border border-gray-300 p-6 rounded">
                <OrderData order={order} />

                <div className="flex flex-col gap-2 md:flex-row md:gap-4 mt-6">
                    {order.order_status_id === 1 && (
                        <button
                            type="button"
                            disabled={pending}
                            className="px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 transition-colors text-center flex-1 rounded font-bold cursor-pointer"
                            onClick={() => handleOpenModal(order.id)}
                        >
                            Preparando
                        </button>
                    )}

                    {(order.order_status_id === 3 && order.home_delivery) && (
                        <button
                            type="button"
                            disabled={pending}
                            className="px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 transition-colors text-center flex-1 rounded font-bold cursor-pointer"
                            onClick={() => handleUpdateStatus(4)}
                        >
                            Enviado
                        </button>
                    )}

                    {((order.order_status_id === 3 && !order.home_delivery) || (order.order_status_id === 4 && order.home_delivery)) && (
                        <button
                            type="button"
                            disabled={pending}
                            className="px-4 py-2 bg-cyan-950 text-white hover:bg-cyan-900 transition-colors text-center flex-1 rounded font-bold cursor-pointer"
                            onClick={() => handleUpdateStatus(5)}
                        >
                            Completo
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
