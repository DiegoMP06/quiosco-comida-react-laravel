import { update } from "@/actions/App/Http/Controllers/Admin/ProductController";
import ProductForm from "@/components/forms/ProductForm";
import NavLinkDashboard from "@/components/NavLinkDashboard";
import MainLayout from "@/layouts/MainLayout";
import products from "@/routes/products";
import { Product, ProductCategory } from "@/schemas";
import { DraftProduct } from "@/types";
import { router } from "@inertiajs/react";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type EditProductViewProps = {
    categories: ProductCategory[]
    product: Product;
}

export default function EditProductView({ categories, product }: EditProductViewProps) {
    const [pending, setPending] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<DraftProduct>({
        defaultValues: {
            name: product.name,
            price: product.price,
            product_category_id: product.product_category_id,
        }
    });

    const onSubmit = (data: DraftProduct) => {
        setPending(true);
        router.post(`${update(product.id).url}?_method=PUT`, {
            ...data,
            image: (data.image?.length && data.image.length > 0) ? data.image[0] : null,
        }, {
            showProgress: true,
            forceFormData: true,
            preserveScroll: true,
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error));
            },
            onFinish: () => setPending(false)
        });
    }

    useEffect(() => {
        setCurrentImage(product.image);
    }, [])

    return (
        <MainLayout
            title="Editar Producto"
            subtitle="Aquí puedes editar los productos de tu menú."
        >
            <NavLinkDashboard href={products.index()}>
                <ChevronLeftIcon className="size-6" />
                Regresar
            </NavLinkDashboard>

            <form className="max-w-xl mx-auto mt-10 grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
                <ProductForm
                    categories={categories}
                    register={register}
                    errors={errors}
                    edit
                    currentImage={currentImage}
                />

                <input
                    disabled={pending}
                    type="submit"
                    value="Guardar Cambios"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded cursor-pointer font-bold disabled:opacity-25"
                />
            </form>
        </MainLayout>
    )
}
