import OrderAPI from "@/api/OrderAPI";
import OrderAdmin from "@/components/OrderAdmin";
import MainLayout from "@/layouts/MainLayout";
import useSWR from "swr";

export default function AdminDashboard() {

    const fetcher = () =>
        OrderAPI.getAvailableOrders()
            .then(data => data)
            .catch((error) => console.log(error));

    const { data, isLoading } = useSWR('/api/orders', fetcher, {
        refreshInterval: 3000,
    });

    return (
        <MainLayout
            title="Ordenes Disponibles"
            subtitle="Aquí puedes ver en tiempo real todas las ordenes disponibles para entregar."
        >
            {isLoading ? (
                <p className="text-gray-400 my-20 text-center text-lg">
                    Cargando...
                </p>
            ) : (
                data?.length === 0 ? (
                    <p className="text-gray-400 my-20 text-center text-lg">
                        No hay ordenes disponibles.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 mt-10">
                        {data?.map(order => (
                            <OrderAdmin
                                key={order.id}
                                order={order}
                            />
                        ))}
                    </div>
                )
            )}
        </MainLayout>
    )
}

