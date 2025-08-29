import { DraftUserAddress } from '@/types';
import { LatLng, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import ErrorMessage from '../ErrorMessage';

type AddressFormProps = {
    register: UseFormRegister<DraftUserAddress>;
    errors: FieldErrors<DraftUserAddress>;
    description: string | null;
    setValue: UseFormSetValue<DraftUserAddress>
    lat?: string;
    lng?: string;
    modal?: boolean
};

export default function AddressForm({ register, errors, description, setValue, lat, lng, modal }: AddressFormProps) {
    const [position, setPosition] = useState<LatLng>(new LatLng(Number(lat) || 19, Number(lng) || -98));
    const mapRef = useRef<Map>(null);

    useEffect(() => {
        setValue('lat', position.lat.toString())
        setValue('lng', position.lng.toString())
    }, [position])

    useEffect(() => {
        setTimeout(() => {
            if (mapRef.current && modal) {
                mapRef.current.invalidateSize();
            }
        }, 0)
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="name" className="text-gray-600 font-bold text-lg">
                    Nombre:
                </label>

                <input
                    type="text"
                    id="name"
                    placeholder="Nombre de la dirección"
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
                <label htmlFor="number" className="text-gray-600 font-bold text-lg">
                    Numero:
                </label>

                <input
                    type="number"
                    id="number"
                    placeholder="Numero de la dirección"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('number', {
                        min: {
                            value: 0,
                            message: 'El numero es invalido',
                        },
                        valueAsNumber: true,
                    })}
                />

                {errors.number && <ErrorMessage>{errors.number.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="street" className="text-gray-600 font-bold text-lg">
                    Calle:
                </label>

                <input
                    type="text"
                    id="street"
                    placeholder="Calle de la dirección"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('street', {
                        required: {
                            value: true,
                            message: 'La calle es requerida',
                        },
                        maxLength: {
                            value: 255,
                            message: 'La calle no puede superar los 255 caracteres',
                        },
                    })}
                />

                {errors.street && <ErrorMessage>{errors.street.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="colony" className="text-gray-600 font-bold text-lg">
                    Colonia:
                </label>

                <input
                    type="text"
                    id="colony"
                    placeholder="Colonia de la dirección"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('colony', {
                        required: {
                            value: true,
                            message: 'La colonia es requerida',
                        },
                        maxLength: {
                            value: 255,
                            message: 'La colonia no puede superar los 255 caracteres',
                        },
                    })}
                />

                {errors.colony && <ErrorMessage>{errors.colony.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="city" className="text-gray-600 font-bold text-lg">
                    Ciudad:
                </label>

                <input
                    type="text"
                    id="city"
                    placeholder="Ciudad de la dirección"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('city', {
                        required: {
                            value: true,
                            message: 'La ciudad es requerido',
                        },
                        maxLength: {
                            value: 255,
                            message: 'La ciudad no puede superar los 255 caracteres',
                        },
                    })}
                />

                {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="zip" className="text-gray-600 font-bold text-lg">
                    Código Postal:
                </label>

                <input
                    type="number"
                    id="zip"
                    placeholder="Código postal de la dirección"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded"
                    {...register('zip', {
                        required: {
                            value: true,
                            message: 'El código postal es requerido',
                        },
                        min: {
                            value: 1,
                            message: 'El código postal es invalido',
                        },
                        valueAsNumber: true,
                    })}
                />

                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="description" className="text-gray-600 font-bold text-lg">
                    Descripción ({description?.length}/1000):
                </label>

                <textarea
                    id="description"
                    placeholder="Descripción de la dirección"
                    className="bg-white border border-gray-300 placeholder:text-gray-400 text-gray-600 px-4 py-3 rounded resize-none"
                    rows={5}
                    {...register('description', {
                        maxLength: {
                            value: 1000,
                            message: 'La descripción no puede superar los 1000 caracteres',
                        },
                    })}
                />

                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="description" className="text-gray-600 font-bold text-lg">
                    Ubicación (arrastra el pin):
                </label>

                <div className="h-96">
                    <MapContainer
                        center={position}
                        zoom={13}
                        ref={mapRef}
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker
                            setPosition={setPosition}
                            position={position}
                        />
                    </MapContainer>
                </div>

                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>
        </>
    )
}


function LocationMarker({
    setPosition,
    position,
}: {
    setPosition: Dispatch<SetStateAction<LatLng>>
    position: LatLng
}) {
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return (
        <Marker position={position} draggable eventHandlers={{
            dragend: (e) => {
                setPosition(e.target.getLatLng())
            }
        }}>
            <Popup>
                Tu Estas Aquí
            </Popup>
        </Marker>
    )
}
