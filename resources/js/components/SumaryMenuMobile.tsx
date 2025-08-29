import { Dialog, DialogPanel } from "@headlessui/react";
import { formatCurrency } from "../helpers";
import { useKioskStore } from "@/stores/kiosk";
import ProductSummary from "./ProductSummary";
import { Link } from "@inertiajs/react";
import { summary } from "@/routes/kiosk";
import { useMenuMobileStore } from "@/stores/menuMobile";

export default function SummaryMenuMobile() {
    const order = useKioskStore(state => state.order);
    const total = useKioskStore(state => state.total);
    const cart = useMenuMobileStore(state => state.cart);
    const setCart = useMenuMobileStore(state => state.setCart);
    const isEmptyOrder = order.length === 0;

    return (
        <Dialog open={cart} onClose={() => setCart(false)} className="md:hidden relative z-50">
            <div className="fixed inset-0 bg-white/50 flex justify-end">
                <DialogPanel
                    transition
                    className="max-w-lg w-2/3 px-4 py-6 bg-white overflow-y-auto data-closed:transform-[scale(95%)] data-closed:opacity-0 data-closed:translate-x-10 duration-300 ease-out"
                >
                    <h2 className="text-3xl text-gray-600 font-bold mb-6">
                        Resumen:
                    </h2>

                    <p className="my-6 text-gray-600 text-lg">
                        Aquí puedes ver el resumen de tu pedido
                    </p>

                    <div className="my-6 ">
                        {isEmptyOrder ? (
                            <p className="font-bold text-gray-600 text-center text-lg">
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
                </DialogPanel>
            </div>
        </Dialog>
    )
}
