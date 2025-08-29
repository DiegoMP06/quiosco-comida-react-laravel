import { Product, UserAddress } from '@/schemas';

export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    admin: number;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type AuthForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    remember: boolean;
    current_password: string;
    token: string;
};

export type UserLogin = Pick<AuthForm, 'email' | 'password' | 'remember'>;

export type UserRegister = Pick<AuthForm, 'name' | 'email' | 'password' | 'password_confirmation'>;

export type UserForgotPassword = Pick<AuthForm, 'email'>;

export type UserResetPassword = Pick<AuthForm, 'email' | 'password' | 'password_confirmation' | 'token'>;

export type UserProfile = Pick<User, 'name' | 'email'>;

export type UserEditPassword = Pick<AuthForm, 'current_password' | 'password' | 'password_confirmation'>;

export type OrderItem = Pick<Product, 'id' | 'name' | 'price' | 'image'> & {
    quantity: number;
};

export type DraftOrderProduct = {
    quantity: number;
    product_id: number;
};

export type DraftOrder = {
    products: DraftOrderProduct[];
    total: number;
    order_type_id: number;
    user_address_id: number | null;
};

export type DeliveryTimeOrder = Pick<Order, 'delivery_time'>;

export type DraftProduct = Pick<Product, 'name' | 'price' | 'product_category_id'> & {
    image?: FileList;
};

export type DraftUserAddress = Pick<UserAddress, 'name' | 'number' | 'street' | 'colony' | 'city' | 'zip' | 'lat' | 'lng' | 'description'> & {
    modal?: boolean;
};
