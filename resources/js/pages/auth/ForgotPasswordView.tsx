import { store } from "@/actions/App/Http/Controllers/Auth/PasswordResetLinkController";
import AuthNavLink from "@/components/AuthNavLink";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { EMAIL_PATTERN } from "@/consts";
import AuthLayout from "@/layouts/AuthLayout";
import { login, register as registerRoute } from '@/routes';
import { UserForgotPassword } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type ForgotPasswordViewProps = {
    status?: string
}

export default function ForgotPasswordView({ status }: ForgotPasswordViewProps) {
    const [pending, setPending] = useState(false);
    const { register, handleSubmit, formState: { errors } , reset} = useForm<UserForgotPassword>();

    const handleForgotPassword = (data: UserForgotPassword) => {
        router.post(store(), data, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error));
            },
            onFinish: () => setPending(false)
        });
    }

    return (
        <AuthLayout
            title="Recuperar Contraseña"
            subtitle="Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."
        >
            {status && (
                <SuccessMessage>
                    {status}
                </SuccessMessage>
            )}

            <form
                className="grid grid-cols-1 gap-4"
                onSubmit={handleSubmit(handleForgotPassword)}
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

                <AuthNavLink href={login()}>
                    ¿Ya tienes una cuenta? Iniciar Sesión
                </AuthNavLink>
            </div>
        </AuthLayout>
    )
}
