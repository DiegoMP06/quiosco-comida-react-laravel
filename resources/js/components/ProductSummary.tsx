import { useKioskStore } from "@/stores/kiosk";
import { OrderItem } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { formatCurrency } from "../helpers";

type ProductSummaryProps = {
    item: OrderItem;
}

export default function ProductSummary({ item }: ProductSummaryProps) {
    const setProductSelected = useKioskStore((state) => state.setProductSelected);
    const deleteFromOrder = useKioskStore((state) => state.deleteFromOrder);

    const handleDelete = () => {
        Swal.fire({
            title: '¡Atención!',
            text: '¿Deseas Eliminar de Tu Order?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'No',
            showConfirmButton: true,
            confirmButtonText: 'Si',
        })
            .then((response) => {
                if (response.isConfirmed) {
                    deleteFromOrder(item.id);
                    toast.success('Se Elimino de tu orden'.toUpperCase());
                }
            })
    }

    return (
        <div className="space-y-1 p-4 bg-white shadow-lg border border-gray-300 rounded">
            <div className="space-y-2">
                <p className="text-xl font-bold text-gray-600">
                    {item.name}
                </p>

                <p className="text-lg font-bold text-gray-600">
                    Cantidad: {item.quantity}
                </p>

                <p className="text-lg font-bold text-cyan-600">
                    Precio: {formatCurrency(Number(item.price))}
                </p>

                <p className="text-lg text-gray-400 font-bold">
                    Subtotal: {formatCurrency(Number(item.price) * item.quantity)}
                </p>
            </div>

            <div className="flex justify-between gap-2 pb-4">
                <button
                    title="Editar"
                    type="button"
                    className="bg-cyan-600 hover:bg-cyan-700 transition-colors p-2 text-white font-bold uppercase text-center rounded cursor-pointer"
                    onClick={() => setProductSelected({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        available: 1,
                        created_at: '',
                        updated_at: '',
                        product_category_id: 0,
                    })}
                >
                    <PencilIcon className="size-6" />
                </button>

                <button
                    title="Eliminar"
                    type="button"
                    className="bg-red-600 hover:bg-red-700 transition-colors p-2 text-white font-bold uppercase text-center rounded cursor-pointer"
                    onClick={handleDelete}
                >
                    <TrashIcon className="size-6" />
                </button>
            </div>
        </div>
    )
}
