import LinkSidebar from "@/components/LinkSidebar";
import { formatDateFromUrl } from "@/helpers";
import { clientDashboard, dashboard, kiosk } from "@/routes";
import orders from "@/routes/orders";
import products from "@/routes/products";
import profile from "@/routes/profile";
import userAddresses from "@/routes/user-addresses";
import { Auth } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import MainHeader from "../components/MainHeader";
import MainMenuMobile from "../components/MainMenuMobile";
import Sidebar from "../components/Sidebar";

type MainLayoutProps = PropsWithChildren<{
    title: string;
    subtitle: string;
}>;

export default function MainLayout({ children, title, subtitle }: MainLayoutProps) {
    const { user } = usePage().props.auth as Auth;
    const isAdmin = user.admin ? true : false;

    return (
        <>
            <Head title={title} />

            <div className="md:flex md:overflow-hidden md:h-screen">
                <Sidebar>
                    {isAdmin ? (
                        <>
                            <LinkSidebar href={dashboard()}>
                                Dashboard
                            </LinkSidebar>
                            <LinkSidebar href={products.index()}>
                                Productos
                            </LinkSidebar>
                            <LinkSidebar href={orders.delivery()}>
                                Envíos a Domicilio
                            </LinkSidebar>
                            <LinkSidebar href={orders.admin(formatDateFromUrl(new Date()))}>
                                Ordenes
                            </LinkSidebar>
                        </>
                    ) : (
                        <>
                            <LinkSidebar href={clientDashboard()}>
                                Dashboard
                            </LinkSidebar>
                            <LinkSidebar href={kiosk(1)}>
                                Nueva Orden
                            </LinkSidebar>
                            <LinkSidebar href={userAddresses.index()}>
                                Servicio a Domicilio
                            </LinkSidebar>
                        </>
                    )}
                    <LinkSidebar href={profile.edit()}>
                        Perfil
                    </LinkSidebar>
                </Sidebar>

                <MainMenuMobile categories={[]} />

                <MainHeader />

                <div className="flex-1 bg-gray-100 overflow-y-auto min-h-screen">
                    <main className="px-4 py-6 container mx-auto mt-16 md:mt-0">
                        <h1 className="font-bold text-3xl text-gray-700 mb-2">
                            {title}
                        </h1>

                        <p className="text-gray-700 text-lg mb-10">
                            {subtitle}
                        </p>

                        {children}
                    </main>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
