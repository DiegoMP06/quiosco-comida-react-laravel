import KioskLayout from '@/layouts/KioskLayout'
import { ProductCategory } from '@/schemas'
import OrderItemsSection from './OrderSumary/OrderItemsSection'
import OrderTypeSection from './OrderSumary/OrderTypeSection'

type OrderSummaryViewProps = {
    categories: ProductCategory[]
}

export default function OrderSummaryView({ categories }: OrderSummaryViewProps) {
    return (
        <KioskLayout
            categories={categories}
            title="Resumen de pedido"
            subtitle="Aquí puedes ver el resumen de tu pedido."
        >
            <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                <OrderItemsSection />

                <OrderTypeSection />
            </div>
        </KioskLayout>
    )
}

