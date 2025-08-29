import { store } from "@/actions/App/Http/Controllers/Client/UserAddressController";
import AddressForm from "@/components/forms/AddressForm";
import NavLinkDashboard from "@/components/NavLinkDashboard";
import MainLayout from "@/layouts/MainLayout";
import userAddresses from "@/routes/user-addresses";
import { DraftUserAddress } from "@/types";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export default function NewAddressView() {
    const queryClient = useQueryClient();
    const [pending, setPending] = useState(false);
    const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm<DraftUserAddress>();
    const description = watch('description');

    const handleCreateAddress = (data: DraftUserAddress) => {
        setPending(true);
        router.post(store(), data, {
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ['user-addresses'] });
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error));
            },
            onFinish: () => setPending(false)
        })
    }

    return (
        <MainLayout
            title="Nueva Dirección"
            subtitle="Aquí puedes crear una nueva dirección de envíos."
        >
            <NavLinkDashboard
                href={userAddresses.index()}
            >
                <ChevronLeftIcon className="size-6" />
                Regresar
            </NavLinkDashboard>


            <form
                className="max-w-xl mx-auto mt-10 grid grid-cols-1 gap-4"
                onSubmit={handleSubmit(handleCreateAddress)}
            >
                <AddressForm
                    register={register}
                    errors={errors}
                    description={description}
                    setValue={setValue}
                />

                <input
                    disabled={pending}
                    type="submit"
                    value="Agregar Dirección"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded cursor-pointer font-bold disabled:opacity-25"
                />
            </form>
        </MainLayout>
    )
}
