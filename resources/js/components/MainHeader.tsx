import { useMenuMobileStore } from "@/stores/menuMobile"
import { Bars4Icon, ShoppingCartIcon } from "@heroicons/react/24/outline"

type MainHeaderProps = {
    kiosk?: boolean
}

export default function MainHeader({ kiosk }: MainHeaderProps) {
    const setMenu = useMenuMobileStore((state) => state.setMenu)
    const setCart = useMenuMobileStore((state) => state.setCart)

    return (
        <header className="fixed block md:hidden top-0 left-0 right-0 bg-white">
            <div className="px-4 py-2 justify-between items-center gap-4 flex container mx-auto">
                <picture className="block max-w-44 w-full">
                    <img src="/logo.png" alt="Logotipo de FreshCoffee" className="block" />
                </picture>

                <div className="flex items-center gap-2">
                    {kiosk && (
                        <button
                            type="button"
                            title="Orden"
                            className="p-1 text-gray-600 cursor-pointer hover:bg-gray-100 rounded transition-colors "
                            onClick={() => setCart(true)}
                        >
                            <ShoppingCartIcon className="size-8" />
                        </button>
                    )}

                    <button
                        onClick={() => setMenu(true)}
                        type="button"
                        className="p-1 text-gray-600 cursor-pointer hover:bg-gray-100 rounded transition-colors "
                        title="Menu"
                    >
                        <Bars4Icon className="size-8" />
                    </button>
                </div>
            </div>
        </header>
    )
}
