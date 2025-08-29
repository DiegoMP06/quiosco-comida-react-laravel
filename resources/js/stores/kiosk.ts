import { Product } from '@/schemas';
import { OrderItem } from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type KioskState = {
    order: OrderItem[];
    total: number;
    order_type_id: number;
    user_address_id: number | null;
    productSelected: Product | null;
    productModal: boolean;
    addToOrder: (item: OrderItem) => void;
    updateOrder: (item: OrderItem) => void;
    deleteFromOrder: (id: OrderItem['id']) => void;
    setTotal: (total: number) => void;
    setProductSelected: (product: Product | null) => void;
    setProductModal: (productModal: boolean) => void;
    setOrderTypeId: (order_type_id: number) => void;
    setUserAddressId: (user_address_id: number | null) => void;
    clearState: () => void;
};

export const useKioskStore = create<KioskState>()(
    devtools(
        persist(
            (set) => ({
                order: [],
                total: 0,
                order_type_id: 1,
                user_address_id: null,
                productSelected: null,
                productModal: false,
                addToOrder: (item) => {
                    set((state) => ({
                        ...state,
                        order: [...state.order, item],
                        productModal: false,
                    }));
                },
                updateOrder: (item) => {
                    set((state) => ({
                        ...state,
                        order: state.order.map((orderItem) => (orderItem.id === item.id ? item : orderItem)),
                        productModal: false,
                    }));
                },
                deleteFromOrder: (id) => {
                    set((state) => ({
                        ...state,
                        order: state.order.filter((orderItem) => orderItem.id !== id),
                    }));
                },
                setTotal: (total) => {
                    set((state) => ({
                        ...state,
                        total,
                    }));
                },
                setProductSelected: (product) => {
                    set((state) => ({
                        ...state,
                        productSelected: product,
                        productModal: true,
                    }));
                },
                setProductModal: (productModal) => {
                    set((state) => ({
                        ...state,
                        productModal,
                    }));
                },
                setOrderTypeId: (order_type_id) => {
                    set((state) => ({
                        ...state,
                        order_type_id,
                    }));
                },
                setUserAddressId: (user_address_id) => {
                    set((state) => ({
                        ...state,
                        user_address_id,
                    }));
                },
                clearState: () => {
                    set({
                        order: [],
                        total: 0,
                        user_address_id: null,
                        order_type_id: 1,
                        productSelected: null,
                        productModal: false,
                    });
                },
            }),
            { name: 'kiosk' },
        ),
    ),
);
