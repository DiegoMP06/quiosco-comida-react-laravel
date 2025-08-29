import NavLinkDashboard from "@/components/NavLinkDashboard";
import Pagination from "@/components/Pagination";
import ProductAdmin from "@/components/ProductAdmin";
import MainLayout from "@/layouts/MainLayout";
import { create } from "@/routes/products";
import { ProductsWithPagination } from '@/schemas'
import { PlusIcon } from "lucide-react";

type ProductsViewProps = {
    products: ProductsWithPagination;
}

export default function ProductsView({ products }: ProductsViewProps) {
    const { data, ...pagination } = products

    return (
        <MainLayout
            title="Productos"
            subtitle="Aquí puedes administrar todos los productos."
        >
            <NavLinkDashboard
                href={create()}
            >
                <PlusIcon className="size-6" />
                Agregar Producto
            </NavLinkDashboard>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {data.map(product => (
                    <ProductAdmin key={product.id} product={product} />
                ))}
            </div>

            <Pagination
                pagination={pagination}
            />
        </MainLayout>
    )
}
