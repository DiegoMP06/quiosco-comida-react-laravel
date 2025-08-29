import ProductItem from "@/components/ProductItem";
import ProductModal from "@/components/ProductModal";
import KioskLayout from "@/layouts/KioskLayout";
import { Product, ProductCategory } from "@/schemas";

type KioskViewProps = {
    categories: ProductCategory[];
    products: Product[];
    category: ProductCategory;
}

export default function KioskView({ categories, products, category }: KioskViewProps) {
    return (
        <KioskLayout
            categories={categories}
            showSummary
            title={category.name}
            subtitle="Elije y personaliza tu pedido a continuación."
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>

            <ProductModal />
        </KioskLayout>
    )
}
