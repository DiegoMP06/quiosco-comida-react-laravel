import { destroy } from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";
import { store } from "@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController";
import SuccessMessage from "@/components/SuccessMessage";
import AuthLayout from "@/layouts/AuthLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

type VerifyEmailViewProps = {
    status?: string
}

export default function VerifyEmailView({ status }: VerifyEmailViewProps) {
    const [pending, setPending] = useState(false);
    const handleResendEmailVerification = () => {
        setPending(true);
        router.post(store(), {}, {
            onFinish: () => {
                setPending(false);
            }
        });
    }

    return (
        <AuthLayout
            title="Confirmar Cuenta"
            subtitle="Confirma tu correo electrónico para continuar y acceder a tu cuenta"
        >
            {status === 'verification-link-sent' && (
                <SuccessMessage>
                    Se envió un nuevo enlace de verificación a tu correo. Por favor revisa tu bandeja de entrada y sigue las instrucciones.
                </SuccessMessage>
            )}

            <div className="flex items-center justify-between gap-4 flex-col">
                <button
                    onClick={handleResendEmailVerification}
                    disabled={pending}
                    type="button"
                    className="text-white bg-cyan-600 hover:bg-cyan-700 text-center px-4 py-3 rounded font-bold cursor-pointer disabled:opacity-25"
                >
                    Enviar enlace de verificación
                </button>

                <Link
                    disabled={pending}
                    href={destroy()}
                    as="button"
                    className="text-gray-400 hover:text-gray-500 text-lg underline cursor-pointer"
                >
                    Cerrar Sesión
                </Link>
            </div>
        </AuthLayout>
    )
}

