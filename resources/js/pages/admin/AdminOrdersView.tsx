import OrderData from "@/components/OrderData";
import Pagination from "@/components/Pagination";
import { formatDateFromUrl } from '@/helpers';
import MainLayout from "@/layouts/MainLayout";
import { admin } from '@/routes/orders';
import { router } from '@inertiajs/react';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { OrdersWithPagination } from '../../schemas/index';

type AdminOrdersViewProps = {
    orders: OrdersWithPagination;
    date: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function AdminOrdersView({ orders, date }: AdminOrdersViewProps) {
    const { data, ...pagination } = orders;

    const handleDateChange = (date: Value) => {
        if (date) {
            router.get(admin(formatDateFromUrl(date as Date)));
        }
    }

    return (
        <MainLayout
            title="Ordenes"
            subtitle="Aquí puedes ver todas las ordenes creadas."
        >
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 bg-white border border-gray-300 p-6 rounded shadow-lg">
                <p className="text-lg text-gray-600 font-bold">
                    Filtrar por fecha:
                </p>

                <DatePicker
                    onChange={handleDateChange}
                    value={new Date(`${date}T00:00:00`)}
                    className="flex-1"
                />
            </div>

            {data.length === 0 ? (
                <p className="text-gray-400 my-20 text-center text-lg">
                    No hay ordenes disponibles.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4 mt-10">
                    {data.map(order => (
                        <div
                            key={order.id}
                            className="bg-white shadow-lg border border-gray-300 p-6 rounded"
                        >
                            <OrderData
                                order={order}
                            />
                        </div>
                    ))}
                </div>
            )}

            <Pagination pagination={pagination} />
        </MainLayout>
    )
}
