import 'leaflet/dist/leaflet.css';
import NavLinkDashboard from '@/components/NavLinkDashboard';
import MainLayout from '@/layouts/MainLayout'
import userAddresses from '@/routes/user-addresses';
import { UserAddress } from '@/schemas'
import { ChevronLeftIcon } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type AddressViewProps = {
    address: UserAddress;
}

export default function AddressView({ address }: AddressViewProps) {
    const GOOGLE_MAPS_API = import.meta.env.VITE_GOOGLE_MAPS_API;

    return (
        <MainLayout
            title={address.name}
            subtitle={address.description || 'Aquí puedes ver la información de tu dirección de envíos.'}
        >
            <NavLinkDashboard href={userAddresses.index()}>
                <ChevronLeftIcon className="size-6" />
                Regresar
            </NavLinkDashboard>

            <div className="mt-10 h-96 rounded border border-gray-300 shadow-lg overflow-hidden">
                <MapContainer
                    center={{ lat: Number(address.lat), lng: Number(address.lng) }}
                    zoom={13}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={{ lat: Number(address.lat), lng: Number(address.lng) }}>
                        <Popup>
                            {address.street} {address.number}, {address.colony}, {address.city}. {address.zip}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

            <a
                className="bg-cyan-950 hover:bg-cyan-800 transition-colors text-white font-bold py-2 px-4 rounded mt-10 block text-center w-full cursor-pointer"
                target="_blank"
                href={`${GOOGLE_MAPS_API}${address.lat},${address.lng}`}
            >
                Ver en Google Maps
            </a>
        </MainLayout >
    )
}

