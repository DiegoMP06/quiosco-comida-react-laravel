import { store } from "@/actions/App/Http/Controllers/Client/UserAddressController";
import AddressForm from "@/components/forms/AddressForm";
import { DraftUserAddress } from "@/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { router } from "@inertiajs/react";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type NewAddressFormModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function NewAddressFormModal({ open, setOpen }: NewAddressFormModalProps) {
    const queryClient = useQueryClient();
    const [pending, setPending] = useState(false);
    const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm<DraftUserAddress>();
    const description = watch('description');

    const handleCreateAddress = (data: DraftUserAddress) => {
        setPending(true);
        router.post(store(), {...data, modal: true}, {
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ['user-addresses'] });
                setOpen(false);
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error));
            },
            onFinish: () => setPending(false)
        })
    }

    return (
        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => setOpen(false)}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-xl rounded border border-gray-300 bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-2xl font-bold text-gray-600">
                            Nueva Dirección
                        </DialogTitle>

                        <form
                            className="max-w-xl mx-auto mt-6 grid grid-cols-1 gap-4"
                            onSubmit={handleSubmit(handleCreateAddress)}
                        >
                            <AddressForm
                                register={register}
                                errors={errors}
                                description={description}
                                setValue={setValue}
                                modal
                            />

                            <input
                                disabled={pending}
                                type="submit"
                                value="Agregar Dirección"
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded cursor-pointer font-bold disabled:opacity-25"
                            />
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    )
}
