import { store } from "@/actions/App/Http/Controllers/Auth/RegisteredUserController";
import AuthNavLink from "@/components/AuthNavLink";
import ErrorMessage from "@/components/ErrorMessage";
import { EMAIL_PATTERN } from "@/consts";
import AuthLayout from "@/layouts/AuthLayout";
import { login } from "@/routes";
import { request } from "@/routes/password";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserRegister } from "../../types";

export default function Register() {
    const [pending, setPending] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserRegister>();

    const password = watch('password');

    const handleRegister = (data: UserRegister) => {
        setPending(true);
        router.post(store(), data, {
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error));
            },
            onFinish: () => setPending(false)
        });
    }

    return (
        <AuthLayout
            title="Crear Cuenta"
            subtitle="Ingresa tus datos para crear tu cuenta y disfrutar de nuestros servicios"
        >
            <form
                className="grid grid-cols-1 gap-4"
                onSubmit={handleSubmit(handleRegister)}
            >
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

                <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="password" className="text-gray-600 font-bold text-lg">
                        Password:
                    </label>

                    <input
                        type="password"
                        id="password"
                        placeholder="Tu Password"
                        autoComplete="current-password"
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
                        autoComplete="current-password"
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
                    value="Crear Cuenta"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded cursor-pointer font-bold disabled:opacity-25"
                />
            </form>

            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4 md:justify-between mt-10">
                <AuthNavLink href={login()}>
                    ¿Ya tienes una Cuenta? Iniciar Sesión
                </AuthNavLink>

                <AuthNavLink href={request()}>
                    ¿Olvidaste tu Password? Recuperarlo
                </AuthNavLink>
            </div>
        </AuthLayout>
    )
}
