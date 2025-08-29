import { useKioskStore } from "@/stores/kiosk";
import { formatCurrency } from "../helpers";
import ProductSummary from "./ProductSummary";
import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { summary } from "@/routes/kiosk";

export default function Summary() {
    const order = useKioskStore(state => state.order);
    const setTotal = useKioskStore(state => state.setTotal);
    const total = useKioskStore(state => state.total);
    const isEmptyOrder = order.length === 0;

    useEffect(() => {
        const total = order.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
        setTotal(total);
    }, [order])

    return (
        <aside className="hidden md:block md:w-64 lg:w-60 xl:w-80 2xl:w-96 px-4 py-6 overflow-y-auto">
            <h2 className="text-3xl text-gray-700 font-bold mb-6">
                Resumen:
            </h2>

            <p className="my-6 text-gray-700 text-lg">
                Aquí puedes ver el resumen de tu pedido
            </p>

            <div className="my-6 ">
                {isEmptyOrder ? (
                    <p className="font-bold text-gray-700 text-center text-lg">
                        No Hay Elementos En El Pedido
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {order.map(item => (
                            <ProductSummary
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                )}
            </div>

            <p className="my-6 text-xl">
                Total: {''}
                <span className="font-bold">
                    {formatCurrency(total)}
                </span>
            </p>

            {!isEmptyOrder && (
                <Link
                    className="text-white font-bold uppercase w-full block px-4 py-2 bg-cyan-950 hover:bg-cyan-900 transition-colors disabled:opacity-25 disabled:bg-cyan-900 text-center"
                    href={summary()}
                >
                    Siguiente
                </Link>
            )}
        </aside>
    )
}
