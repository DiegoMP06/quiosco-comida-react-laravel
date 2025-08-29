import LinkSidebar from "@/components/LinkSidebar";
import MainHeader from "@/components/MainHeader";
import MainMenuMobile from "@/components/MainMenuMobile";
import Sidebar from "@/components/Sidebar";
import SummaryMenuMobile from "@/components/SumaryMenuMobile";
import Summary from "@/components/Summary";
import { clientDashboard, kiosk } from "@/routes";
import storage from "@/routes/storage";
import { ProductCategory } from "@/schemas";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

type KioskLayoutProps = PropsWithChildren<{
    categories: ProductCategory[];
    showSummary?: boolean;
    title: string;
    subtitle: string;
}>;

export default function KioskLayout({ children, categories, showSummary, title, subtitle }: KioskLayoutProps) {
    return (
        <>
            <Head title={title} />

            <div className="md:flex md:overflow-hidden md:h-screen">
                <Sidebar>
                    <LinkSidebar href={clientDashboard()}>
                        <ChevronLeftIcon className="size-6" />
                        Regresar
                    </LinkSidebar>

                    {categories.map((category) => (
                        <LinkSidebar key={category.id} href={kiosk({ product_category: category.id })}>
                            <img
                                src={storage.local({ path: `product_categories/${category.icon}` }).url}
                                alt={`icono de la categoría ${category.name}`}
                                className="size-10 aspect-square"
                            />

                            {category.name}
                        </LinkSidebar>
                    ))}
                </Sidebar>

                <MainMenuMobile>
                    <LinkSidebar href={clientDashboard()}>
                        <ChevronLeftIcon className="size-6" />
                        Regresar
                    </LinkSidebar>

                    {categories.map((category) => (
                        <LinkSidebar key={category.id} href={kiosk({ product_category: category.id })}>
                            <img
                                src={storage.local({ path: `product_categories/${category.icon}` }).url}
                                alt={`icono de la categoría ${category.name}`}
                                className="size-10 aspect-square"
                            />

                            {category.name}
                        </LinkSidebar>
                    ))}
                </MainMenuMobile>

                <MainHeader kiosk={showSummary} />

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

                {showSummary && (
                    <>
                        <Summary />
                        <SummaryMenuMobile />
                    </>
                )}
            </div>

            <ToastContainer />
        </>
    )
}

