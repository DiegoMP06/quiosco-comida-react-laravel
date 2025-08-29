import { formatCurrency, formatDate } from "@/helpers";
import { Order } from "@/schemas"
import { MapIcon } from "@heroicons/react/24/outline";

type OrderDataProps = {
    order: Order;
}

export default function OrderData({ order }: OrderDataProps) {
    const GOOGLE_MAPS_API = import.meta.env.VITE_GOOGLE_MAPS_API;

    return (
        <>
            <p className="text-xl font-bold text-gray-600">
                ID: {order.id}
            </p>

            <p className="text-gray-600 text-lg font-bold">
                Fecha: {''}
                <span className="font-normal">
                    {formatDate(order.created_at)}
                </span>
            </p>

            <p className="text-gray-600 text-lg font-bold">
                Estatus: {''}
                <span className="font-normal">
                    {order.order_status.name}
                </span>
            </p>

            <p className="text-gray-600 text-lg font-bold">
                Tipo: {''}
                <span className="font-normal">
                    {order.order_type.name}
                </span>
            </p>

            {order.address.length > 0 && (
                <div className="flex gap-4 justify-between items-center">
                    <p className="text-gray-600 text-lg font-bold">
                        Dirección de entrega: {''}
                        <span className="font-normal">
                            {order.address[0].street} {order.address[0].number}, {order.address[0].colony}, {order.address[0].city}. {order.address[0].zip}
                        </span>
                    </p>

                    <div>
                        <a
                            href={`${GOOGLE_MAPS_API}${order.address[0].lat},${order.address[0].lng}`}
                            className="p-2 rounded border border-cyan-800 hover:bg-gray-100 transition-colors cursor-pointer block text-cyan-800"
                            target="_blank"
                            title="Ver en Google Maps"
                        >
                            <MapIcon className="size-6" />
                        </a>
                    </div>
                </div>
            )}

            {order.delivery_time && (
                <p className="text-gray-600 text-lg font-bold">
                    Tiempo de entrega: {''}
                    <span className="font-normal">
                        {order.delivery_time} minutos
                    </span>
                </p>
            )}

            {order.completed_at && (
                <p className="text-gray-600 text-lg font-bold">
                    Entregado: {''}
                    <span className="font-normal">
                        {formatDate(order.completed_at)}
                    </span>
                </p>
            )}

            {order.user && (
                <p className="font-bold text-lg text-gray-600">
                    Cliente: {' '}
                    <span className="font-normal">
                        {order.user.name}
                    </span>
                </p>
            )}

            <p className="text-lg font-bold text-slate-600 mt-4">
                Contenido del Pedido:
            </p>

            <ul className="divide-y divide-gray-300" role="list">
                {order.products.map(product => (
                    <li className="p-2 ml-6 list-decimal" key={product.id} role="listitem">
                        <p className="font-bold text-gray-600 text-lg">{product.name}</p>

                        <p className="text-gray-400 font-bold">
                            Precio: {''}
                            <span className="font-normal">
                                {formatCurrency(Number(product.price))}
                            </span>
                        </p>

                        <p className="text-gray-400 font-bold">
                            Cantidad: {''}
                            <span className="font-normal">
                                {product.pivot.quantity}
                            </span>
                        </p>

                        <p className="text-gray-400 font-bold">
                            Subtotal: {''}
                            <span className="font-normal">
                                {formatCurrency(Number(product.price) * product.pivot.quantity)}
                            </span>
                        </p>
                    </li>
                ))}
            </ul>

            <p className="font-bold text-xl text-cyan-600">
                Total a Pagar: {' '}
                <span className="font-normal text-gray-600">
                    {formatCurrency(Number(order.total))}
                </span>
            </p>
        </>
    )
}
