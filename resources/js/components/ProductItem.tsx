import type { Product } from "../schemas";
import { formatCurrency } from "../helpers";
import storage from "@/routes/storage";
import { useKioskStore } from "@/stores/kiosk";

type ProductProps = {
    product: Product;
}

export default function ProductItem({ product }: ProductProps) {
    const setProductSelected = useKioskStore((state) => state.setProductSelected);
    const order = useKioskStore((state) => state.order);

    const isInOrder = order.some(item => item.id === product.id);

    return (
        <div className="shadow-lg bg-white flex flex-col border border-gray-300">
            <img
                src={storage.local({ path: `products/${product.image}` }).url}
                alt={`imagen del producto ${product.name}`}
                width={500}
                height={600}
                className="w-full h-auto"
            />

            <div className="p-6 space-y-5">
                <h3 className="text-2xl font-bold text-gray-700 truncate" title={product.name}>
                    {product.name}
                </h3>

                <p className="text-4xl font-bold text-cyan-600">
                    {formatCurrency(Number(product.price))}
                </p>

                <button
                    type="button"
                    className="text-white font-bold uppercase bg-cyan-950 hover:bg-cyan-900 transition-colors px-4 py-2 w-full rounded cursor-pointer"
                    onClick={() => setProductSelected(product)}
                >
                    {isInOrder ? 'Editar' : 'Añadir'}
                </button>
            </div>
        </div>
    )
}
