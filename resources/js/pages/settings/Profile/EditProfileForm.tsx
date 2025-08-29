import { update } from "@/actions/App/Http/Controllers/Settings/ProfileController";
import ErrorMessage from "@/components/ErrorMessage";
import { EMAIL_PATTERN } from "@/consts";
import { Auth, UserProfile } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditProfileForm() {
    const [pending, setPending] = useState(false);
    const { user } = usePage().props.auth as Auth;

    const { register, handleSubmit, formState: { errors } } = useForm<UserProfile>({
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })

    const handleEditProfile = (data: UserProfile) => {
        setPending(true);

        router.patch(update(), data, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('El perfil se actualizo exitosamente')
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
            onSubmit={handleSubmit(handleEditProfile)}
        >
            <legend className="text-2xl font-bold text-cyan-600">
                Editar Perfil
            </legend>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="name" className="text-gray-600 font-bold text-lg">
                    Nombre:
                </label>

                <input
                    type="text"
                    id="name"
                    placeholder="Tu Nombre"
                    autoComplete="email"
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

                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="email" className="text-gray-600 font-bold text-lg">
                    Email:
                </label>

                <input
                    type="email"
                    id="email"
                    placeholder="Tu Email"
                    autoComplete="email"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'El email es requerido',
                        },
                        maxLength: {
                            value: 255,
                            message: 'El email no puede superar los 255 caracteres',
                        },
                        pattern: {
                            value: EMAIL_PATTERN,
                            message: 'El email no es válido',
                        }
                    })}
                />

                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

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

