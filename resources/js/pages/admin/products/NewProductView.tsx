import NavLinkDashboard from "@/components/NavLinkDashboard";
import MainLayout from "@/layouts/MainLayout";
import products from "@/routes/products";
import { ChevronLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { DraftProduct } from "@/types";
import ProductForm from "@/components/forms/ProductForm";
import { ProductCategory } from "@/schemas";
import { router } from "@inertiajs/react";
import { store } from "@/actions/App/Http/Controllers/Admin/ProductController";
import { useState } from "react";
import { toast } from "react-toastify";

type NewProductViewProps = {
    categories: ProductCategory[];
}


export default function NewProductView({ categories }: NewProductViewProps) {
    const [pending, setPending] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<DraftProduct>()

    const onSubmit = (data: DraftProduct) => {
        if (!data.image?.length || data.image.length === 0) return;
        setPending(true);
        router.post(store(), {
            ...data,
            image: data?.image[0],
        }, {
            showProgress: true,
            forceFormData: true,
            preserveScroll: true,
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error));
            },
            onFinish: () => setPending(false)
        })
    }

    return (
        <MainLayout
            title="Agregar Producto"
            subtitle="Aquí puedes agregar nuevos productos a tu menú."
        >
            <NavLinkDashboard
                href={products.index()}
            >
                <ChevronLeftIcon className="size-6" />
                Regresar
            </NavLinkDashboard>

            <form className="max-w-xl mx-auto mt-10 grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
                <ProductForm
                    categories={categories}
                    register={register}
                    errors={errors}
                />

                <input
                    disabled={pending}
                    type="submit"
                    value="Agregar Producto"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded cursor-pointer font-bold disabled:opacity-25"
                />
            </form>
        </MainLayout>
    )
}
