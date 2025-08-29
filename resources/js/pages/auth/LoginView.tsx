import { store } from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";
import AuthNavLink from "@/components/AuthNavLink";
import ErrorMessage from "@/components/ErrorMessage";
import { EMAIL_PATTERN } from "@/consts";
import AuthLayout from "@/layouts/AuthLayout";
import { register as registerRoute } from "@/routes";
import { request } from "@/routes/password";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserLogin } from "../../types";
import SuccessMessage from "@/components/SuccessMessage";

type LoginViewProps = {
    status?: string
}

export default function LoginView({ status }: LoginViewProps) {
    const [pending, setPending] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UserLogin>();

    const handleLogin = (data: UserLogin) => {
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
            title="Iniciar Sesión"
            subtitle="Inicia sesión para acceder a tu cuenta y disfrutar de nuestros servicios"
        >
            {status && (
                <SuccessMessage>
                    {status}
                </SuccessMessage>
            )}

            <form
                className="grid grid-cols-1 gap-4"
                onSubmit={handleSubmit(handleLogin)}
            >
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
                        })}
                    />

                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div>
                    <label className="text-gray-600 font-bold text-lg flex gap-4 items-center" htmlFor="remember">
                        <input
                            type="checkbox"
                            id="remember"
                            className="form-checkbox h-5 w-5 text-cyan-600"
                            onChange={(e) => setValue('remember', (e.target as HTMLInputElement).checked)}
                        />
                        Recordarme
                    </label>
                </div>

                <input
                    disabled={pending}
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded cursor-pointer font-bold disabled:opacity-25"
                />
            </form>

            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4 md:justify-between mt-10">
                <AuthNavLink href={registerRoute()}>
                    ¿No tienes una cuenta? Registrarse
                </AuthNavLink>

                <AuthNavLink href={request()}>
                    ¿Olvidaste tu Password? Recuperarlo
                </AuthNavLink>
            </div>
        </AuthLayout>
    )
}
