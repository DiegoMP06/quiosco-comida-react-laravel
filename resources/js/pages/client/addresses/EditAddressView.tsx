import { update } from '@/actions/App/Http/Controllers/Client/UserAddressController'
import AddressForm from '@/components/forms/AddressForm'
import NavLinkDashboard from '@/components/NavLinkDashboard'
import MainLayout from '@/layouts/MainLayout'
import userAddresses from '@/routes/user-addresses'
import { UserAddress } from '@/schemas'
import { DraftUserAddress } from '@/types'
import { router } from '@inertiajs/react'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronLeftIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type EditAddressViewProps = {
    address: UserAddress
}

export default function EditAddressView({ address }: EditAddressViewProps) {
    const queryClient = useQueryClient();
    const [pending, setPending] = useState(false);
    const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm<DraftUserAddress>({
        defaultValues: {
            name: address.name,
            number: address.number,
            street: address.street,
            colony: address.colony,
            city: address.city,
            zip: address.zip,
            description: address.description,
            lat: address.lat,
            lng: address.lng
        }
    });

    const description = watch('description');

    const handleEditAddress = (data: DraftUserAddress) => {
        setPending(true);
        router.put(update(address.id), data, {
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
            title="Editar Dirección"
            subtitle="Aquí puedes editar una dirección de envíos."
        >
            <NavLinkDashboard
                href={userAddresses.index()}
            >
                <ChevronLeftIcon className="size-6" />
                Regresar
            </NavLinkDashboard>


            <form
                className="max-w-xl mx-auto mt-10 grid grid-cols-1 gap-4"
                onSubmit={handleSubmit(handleEditAddress)}
            >
                <AddressForm
                    register={register}
                    errors={errors}
                    description={description}
                    setValue={setValue}
                    lat={address.lat}
                    lng={address.lng}
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
