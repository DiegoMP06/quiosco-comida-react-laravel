import { z } from 'zod';

export const PaginationSchema = z.object({
    current_page: z.number(),
    first_page_url: z.string(),
    from: z.number(),
    last_page: z.number(),
    last_page_url: z.string(),
    links: z.array(
        z.object({
            url: z.string().nullable(),
            label: z.string(),
            page: z.number().nullable(),
            active: z.boolean(),
        }),
    ),
    next_page_url: z.string().nullable(),
    path: z.string(),
    per_page: z.number(),
    prev_page_url: z.string().nullable(),
    to: z.number(),
    total: z.number(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const ProductCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    icon: z.string(),
});

export type ProductCategory = z.infer<typeof ProductCategorySchema>;

export const OrderTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    icon: z.string(),
});

export type OrderType = z.infer<typeof OrderTypeSchema>;

export const OrderStatusSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    image: z.string(),
    available: z.number(),
    product_category_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductsWithPaginationSchema = PaginationSchema.extend({
    data: z.array(ProductSchema),
})

export type ProductsWithPagination = z.infer<typeof ProductsWithPaginationSchema>;

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    admin: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const UserAddressSchema = z.object({
    id: z.number(),
    name: z.string(),
    number: z.string().nullable(),
    street: z.string(),
    colony: z.string(),
    city: z.string(),
    zip: z.string(),
    lat: z.string(),
    lng: z.string(),
    description: z.string().nullable(),
    user_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type UserAddress = z.infer<typeof UserAddressSchema>;

export const UserAddressAPISchema = z.object({
    data: z.array(UserAddressSchema),
});

export const OrderSchema = z.object({
    id: z.number(),
    total: z.string(),
    delivery_time: z.number().nullable(),
    completed_at: z.string().nullable(),
    user_id: z.number(),
    order_type_id: z.number(),
    order_status_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    user: UserSchema.optional(),
    order_type: OrderTypeSchema,
    order_status: OrderStatusSchema,
    address: z.array(UserAddressSchema),
    products: z.array(
        ProductSchema.extend({
            pivot: z.object({
                quantity: z.number(),
            }),
        }),
    ),
});

export type Order = z.infer<typeof OrderSchema>;

export const OrderAPISchema = z.object({
    data: z.array(OrderSchema),
});

export const OrdersWithPaginationSchema = PaginationSchema.extend({
    data: z.array(OrderSchema),
});

export type OrdersWithPagination = z.infer<typeof OrdersWithPaginationSchema>;
