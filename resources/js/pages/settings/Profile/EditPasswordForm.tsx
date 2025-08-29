import { update } from "@/actions/App/Http/Controllers/Settings/PasswordController";
import ErrorMessage from "@/components/ErrorMessage";
import { UserEditPassword } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export default function EditPasswordForm() {
    const [pending, setPending] = useState(false);

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<UserEditPassword>()

    const password = watch('password');

    const handleEditPassword = (data: UserEditPassword) => {
        setPending(true);

        router.put(update(), data, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('El password se actualizo exitosamente')
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error))
            },
            onFinish: () => setPending(false)
        });
    }

    return (
        <form
            className="grid grid-cols-1 gap-4 p-6 bg-white rounded shadow-lg border border-gray-300 max-w-xl mx-auto mt-10"
            onSubmit={handleSubmit(handleEditPassword)}
        >
            <legend className="text-2xl font-bold text-cyan-600">
                Cambiar Password
            </legend>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="current_password" className="text-gray-600 font-bold text-lg">
                    Password Actual:
                </label>

                <input
                    type="password"
                    id="current_password"
                    placeholder="Tu Password"
                    autoComplete="current-password"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('current_password', {
                        required: {
                            value: true,
                            message: 'El password es requerido',
                        },
                    })}
                />

                {errors.current_password && <ErrorMessage>{errors.current_password.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="password" className="text-gray-600 font-bold text-lg">
                    Nuevo Password:
                </label>

                <input
                    type="password"
                    id="password"
                    placeholder="Tu Nuevo Password"
                    autoComplete="new-password"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'El password es requerido',
                        },
                        minLength: {
                            value: 6,
                            message: 'El password debe contener al menos 6 caracteres',
                        }
                    })}
                />

                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="password_confirmation" className="text-gray-600 font-bold text-lg">
                    Repetir Password:
                </label>

                <input
                    type="password"
                    id="password_confirmation"
                    placeholder="Repite tu Password"
                    autoComplete="new-password"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('password_confirmation', {
                        required: {
                            value: true,
                            message: 'El password es requerido',
                        },
                        validate: (value) => value === password || 'Los passwords no coinciden',
                    })}
                />

                {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
            </div>

            <input
                disabled={pending}
                type="submit"
                value="Guardar Cambios"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded cursor-pointer font-bold disabled:opacity-25"
            />
        </form>
    )
}
