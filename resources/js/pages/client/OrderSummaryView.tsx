import KioskLayout from '@/layouts/KioskLayout'
import { OrderType, ProductCategory } from '@/schemas'
import OrderItemsSection from './OrderSumary/OrderItemsSection'
import OrderTypeSection from './OrderSumary/OrderTypeSection'

type OrderSummaryViewProps = {
    categories: ProductCategory[]
    types: OrderType[]
}

export default function OrderSummaryView({ categories, types }: OrderSummaryViewProps) {
    return (
        <KioskLayout
            categories={categories}
            title="Resumen de pedido"
            subtitle="Aquí puedes ver el resumen de tu pedido."
        >
            <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                <OrderItemsSection />

                <OrderTypeSection types={types} />
            </div>
        </KioskLayout>
    )
}

