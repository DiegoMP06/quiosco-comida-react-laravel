import { update } from "@/actions/App/Http/Controllers/Client/OrderController";
import { Order } from "@/schemas";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import OrderData from "./OrderData";

type OrderItemProps = {
    order: Order;
    admin?: boolean;
}

export default function OrderItem({ order }: OrderItemProps) {
    const [pending, setPending] = useState(false);

    const handleCancelOrder = () => {
        Swal.fire({
            title: '¡Atención!',
            text: '¿Deseas Cancelar la orden?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'No',
            showConfirmButton: true,
            confirmButtonText: 'Si',
        })
            .then((response) => {
                if (response.isConfirmed) {
                    setPending(true);
                    router.patch(update({ order: order.id }), { status: 2 }, {
                        onSuccess: () => {
                            toast.success('El estatus del pedido se actualizo exitosamente')
                        },
                        onError: (errors) => {
                            Object.values(errors).forEach((error) => toast.error(error))
                        },
                        onFinish: () => setPending(false)
                    })
                }
            })
    }

    return (
        <div className="bg-white shadow-lg border border-gray-300 p-6 rounded">
            <OrderData
                order={order}
            />

            <div className="flex flex-col gap-2 md:flex-row md:gap-4 mt-6">
                {order.order_status_id === 1 && (
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-700 text-white hover:bg-red-800 transition-colors text-center flex-1 rounded font-bold cursor-pointer"
                        onClick={handleCancelOrder}
                        disabled={pending}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </div>
    )
}

