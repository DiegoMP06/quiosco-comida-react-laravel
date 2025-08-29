import DeliveryTimeOrderController from "@/actions/App/Http/Controllers/Admin/DeliveryTimeOrderController";
import { update } from "@/actions/App/Http/Controllers/Client/OrderController";
import DeliveryTimeFormModal from "@/pages/admin/AdminDashboard/DeliveryTimeFormModal";
import { Order } from "@/schemas";
import { DeliveryTimeOrder } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
import OrderData from "./OrderData";

type OrderAdminProps = {
    order: Order;
}

export default function OrderAdmin({ order }: OrderAdminProps) {
    const [pending, setPending] = useState(false);
    const [openModal, setOpenModal] = useState(false);

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

    const handleSubmitDeliveryTime = (data: DeliveryTimeOrder) => {
        setPending(true);
        router.post(DeliveryTimeOrderController(order.id), data, {
            preserveScroll: true,
            onSuccess: () => {
                setOpenModal(false);
                toast.success('El tiempo de entrega se actualizo exitosamente')
                handleUpdateStatus(3);
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
                            onClick={() => setOpenModal(true)}
                        >
                            Preparando
                        </button>
                    )}

                    {(order.order_status_id === 3 && order.order_type_id === 1) && (
                        <button
                            type="button"
                            disabled={pending}
                            className="px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 transition-colors text-center flex-1 rounded font-bold cursor-pointer"
                            onClick={() => handleUpdateStatus(4)}
                        >
                            Enviado
                        </button>
                    )}

                    {((order.order_status_id === 3 && order.order_type_id === 2) || (order.order_status_id === 4 && order.order_type_id === 1)) && (
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

            <DeliveryTimeFormModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleSubmitDeliveryTime={handleSubmitDeliveryTime}
                pending={pending}
            />
        </>
    )
}
