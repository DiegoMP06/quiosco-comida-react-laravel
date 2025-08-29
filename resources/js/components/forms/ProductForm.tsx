import storage from "@/routes/storage";
import { ProductCategory } from "@/schemas";
import { DraftProduct } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    categories: ProductCategory[];
    register: UseFormRegister<DraftProduct>;
    errors: FieldErrors<DraftProduct>;
    edit?: boolean;
    currentImage?: string;
}
export default function ProductForm({ categories, register, errors, edit, currentImage }: Props) {
    return (
        <>
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="name" className="text-gray-600 font-bold text-lg">
                    Nombre:
                </label>

                <input
                    type="text"
                    id="name"
                    placeholder="Nombre del Producto"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'El nombre es requerido',
                        },
                        maxLength: {
                            value: 255,
                            message: 'El nombre no puede superar los 255 caracteres',
                        },
                    })}
                />

                {errors.name && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="price" className="text-gray-600 font-bold text-lg">
                    Precio:
                </label>

                <input
                    type="number"
                    id="price"
                    placeholder="Precio del Producto"
                    step="0.01"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('price', {
                        required: {
                            value: true,
                            message: 'El precio es requerido',
                        },
                        min: {
                            value: 0,
                            message: 'El precio debe ser mayor a 0',
                        },
                        valueAsNumber: true,
                    })}
                />

                {errors.price && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.price.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="image" className="text-gray-600 font-bold text-lg">
                    Imagen:
                </label>

                <input
                    type="file"
                    accept="image/*"
                    id="image"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('image', {
                        required: {
                            value: !edit,
                            message: 'La imagen es requerida',
                        },
                        max: {
                            value: 1028,
                            message: 'La imagen no puede superar los 1028KB',
                        }
                    })}
                />


                {errors.image && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.image.message}</p>}
            </div>

            {(edit && currentImage) && (
                <div className="grid grid-cols-1 gap-1">
                    <p className="text-gray-600 font-bold text-lg">
                        Imagen actual
                    </p>

                    <img
                        src={storage.local({ path: `products/${currentImage}` }).url}
                        alt="Imagen del producto a editar"
                        className="w-full max-w-64 mt-6 block rounded"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="product_category_id" className="text-gray-600 font-bold text-lg">
                    Categoría:
                </label>

                <select
                    id="product_category_id"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('product_category_id', {
                        required: {
                            value: true,
                            message: 'La categoría es requerida',
                        },
                        valueAsNumber: true,
                    })}
                >
                    {categories.map(({ id, name }) => (
                        <option value={id} key={id}>
                            {name}
                        </option>
                    ))}
                </select>

                {errors.product_category_id && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.product_category_id.message}</p>}
            </div>
        </>
    )
}
