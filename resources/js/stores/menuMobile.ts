import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type MenuMobileState = {
    menu: boolean;
    cart: boolean;
    setMenu: (menu: boolean) => void;
    setCart: (cart: boolean) => void;
};

export const useMenuMobileStore = create<MenuMobileState>()(
    devtools(
        persist(
            (set) => ({
                menu: false,
                cart: false,
                setMenu: (menu: boolean) => {
                    set((state) => ({
                        ...state,
                        menu,
                        cart: false,
                    }));
                },
                setCart: (cart: boolean) => {
                    set((state) => ({
                        ...state,
                        cart,
                        menu: false,
                    }));
                },
            }),
            { name: 'menuMobile' },
        ),
    ),
);
