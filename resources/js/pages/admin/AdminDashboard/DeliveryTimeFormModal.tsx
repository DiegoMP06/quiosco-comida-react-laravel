import ErrorMessage from "@/components/ErrorMessage";
import { DeliveryTimeOrder } from "@/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type DeliveryTimeFormModalProps = {
    setOpenModal: Dispatch<SetStateAction<boolean>>
    openModal: boolean
    handleSubmitDeliveryTime: (data: DeliveryTimeOrder) => void
    pending: boolean;
}

export default function DeliveryTimeFormModal({ openModal, setOpenModal, handleSubmitDeliveryTime,pending }: DeliveryTimeFormModalProps) {
    const { register, formState: { errors }, handleSubmit } = useForm<DeliveryTimeOrder>();

    return (
        <Dialog open={openModal} as="div" className="relative z-10 focus:outline-none" onClose={() => setOpenModal(false)}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-xl rounded border border-gray-300 bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-2xl font-bold text-gray-600">
                            Tiempo de entrega
                        </DialogTitle>

                        <form
                            className="max-w-xl mx-auto mt-6 grid grid-cols-1 gap-4"
                            onSubmit={handleSubmit(handleSubmitDeliveryTime)}
                        >
                            <div className="grid grid-cols-1 gap-1">
                                <label htmlFor="delivery_time" className="text-gray-600 font-bold text-lg">
                                    Tiempo (minutos):
                                </label>

                                <input
                                    type="number"
                                    id="delivery_time"
                                    placeholder="Numero de la dirección"
                                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                                    {...register('delivery_time', {
                                        min: {
                                            value: 0,
                                            message: 'El numero es invalido',
                                        },
                                        valueAsNumber: true,
                                    })}
                                />

                                {errors.delivery_time && <ErrorMessage>{errors.delivery_time.message}</ErrorMessage>}
                            </div>

                            <input
                                disabled={pending}
                                type="submit"
                                value="Guardar"
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded cursor-pointer font-bold disabled:opacity-25"
                            />
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    )
}
