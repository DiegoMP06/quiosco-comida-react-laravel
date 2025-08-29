import OrderItem from "@/components/OrderItem";
import Pagination from "@/components/Pagination";
import MainLayout from "@/layouts/MainLayout";
import { kiosk } from "@/routes";
import { OrdersWithPagination } from "@/schemas";
import { Link } from "@inertiajs/react";

type ClientDashboardViewProps = {
    orders: OrdersWithPagination;
}

export default function ClientDashboardView({ orders }: ClientDashboardViewProps) {
    const { data, ...pagination } = orders;

    return (
        <MainLayout
            title="Ordenes"
            subtitle="Aquí puedes ver todas tus ordenes realizadas."
        >
            {data.length === 0 ? (
                <p className="text-gray-400 my-20 text-center text-lg">
                    No tienes ninguna orden realizada. {''}
                    <Link className="text-cyan-600 hover:underline" href={kiosk({ product_category: 1 })}>
                        Crear una ahora.
                    </Link>
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {data.map(order => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </div>
            )}

            <Pagination pagination={pagination} />
        </MainLayout>
    )
}

