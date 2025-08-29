import { formatCurrency } from "@/helpers";
import storage from "@/routes/storage";
import { useKioskStore } from "@/stores/kiosk";

export default function OrderItemsSection() {
    const order = useKioskStore((state) => state.order);
    const total = useKioskStore((state) => state.total);

    return (
        <div className="bg-white border border-gray-300 p-6 rounded shadow-lg lg:w-3/5 2xl:w-2/3">
            <h2 className="text-2xl text-cyan-600 font-bold">
                Productos: {''}
            </h2>

            <div className="grid grid-cols-1 divide-y divide-gray-300 mt-2">
                {order.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-2">
                        <img
                            src={storage.local({ path: `products/${item.image}` }).url}
                            alt={`imagen del producto ${item.name}`}
                            className="w-full sm:w-48 h-auto"
                            width={500}
                            height={600}
                        />

                        <div className="flex-1 flex flex-col gap-1">
                            <h3 className="text-xl font-bold text-gray-600">
                                {item.name}
                            </h3>

                            <p className="text-2xl text-cyan-600">
                                {formatCurrency(Number(item.price))}
                            </p>

                            <p className="text-gray-600 text-lg font-bold">
                                Cantidad: {''}
                                <span className="font-normal">
                                    {item.quantity}
                                </span>
                            </p>

                            <p className="text-gray-600 text-lg font-bold">
                                SubTotal: {''}
                                <span className="font-normal">
                                    {formatCurrency(Number(item.price) * item.quantity)}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4">
                <p className="font-bold text-cyan-600 text-2xl text-end">
                    Total: {formatCurrency(total)}
                </p>
            </div>
        </div>
    )
}

