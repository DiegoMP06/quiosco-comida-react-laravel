import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "../helpers";
import { useKioskStore } from '../stores/kiosk';
import storage from "@/routes/storage";
import { useEffect, useState } from "react";
import { OrderItem } from "@/types";
import { toast } from "react-toastify";

export default function ProductModal() {
    const productModal = useKioskStore((state) => state.productModal)
    const productSelected = useKioskStore((state) => state.productSelected)
    const setProductModal = useKioskStore((state) => state.setProductModal)
    const order = useKioskStore((state) => state.order)
    const addToOrder = useKioskStore((state) => state.addToOrder)
    const updateOrder = useKioskStore((state) => state.updateOrder)
    const [quantity, setQuantity] = useState(1);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const item = order.find(item => item.id === productSelected?.id);

        if (item) {
            setEdit(true);
            setQuantity(item.quantity);
        } else {
            setEdit(false);
            setQuantity(1);
        }
    }, [productSelected]);

    const MAX_QUANTITY = 5;
    const MIN_QUANTITY = 1;

    const handleAddQuantity = () =>
        quantity < MAX_QUANTITY && setQuantity(quantity + 1);

    const handleSubtractQuantity = () =>
        quantity > MIN_QUANTITY && setQuantity(quantity - 1);

    const handleSaveOrder = () => {
        if (!productSelected) return;
        const existItem = order.some(item => item.id === productSelected.id);
        const { id, name, price, image } = productSelected

        const item: OrderItem = {
            id,
            name,
            price,
            image,
            quantity
        }

        if (existItem) {
            updateOrder(item);
            toast.success(`Se actualizo ${name} en el pedido`.toUpperCase());
            return;
        }

        addToOrder(item);
        toast.success(`Se agrego ${name} al pedido`.toUpperCase());
    }

    return (
        <Dialog open={productModal} as="div" className="relative z-10 focus:outline-none" onClose={() => setProductModal(false)}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-xl rounded border border-gray-300 bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <div className="md:flex gap-4">
                            <div className="md:w-1/3">
                                <img
                                    src={storage.local({ path: `/products/${productSelected?.image}` }).url}
                                    alt={`Imagen del Producto ${productSelected?.name}`}
                                    className="w-full h-auto"
                                    width={500}
                                    height={600}
                                />
                            </div>

                            <div className="md:w-2/3 flex flex-col justify-between gap-4">
                                <div className="flex flex-col gap-5">
                                    <DialogTitle as="h3" className="text-2xl font-bold text-gray-600">
                                        {productSelected?.name}
                                    </DialogTitle>

                                    <p className="font-bold text-4xl text-cyan-600">
                                        {formatCurrency(Number(productSelected?.price))}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        <button
                                            title="Restar"
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
                                            onClick={handleSubtractQuantity}
                                        >
                                            <MinusCircleIcon className="size-8" />
                                        </button>

                                        <p className="text-3xl text-gray-600">
                                            {quantity}
                                        </p>

                                        <button
                                            title="Sumar"
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
                                            onClick={handleAddQuantity}
                                        >
                                            <PlusCircleIcon className="size-8" />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="bg-cyan-950 hover:bg-cyan-900 transition-colors text-white font-bold w-full block px-4 py-2 uppercase cursor-pointer"
                                        onClick={handleSaveOrder}
                                    >
                                        {edit ? 'Actualizar en el pedido' : 'Añadir al pedido'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    )
}

