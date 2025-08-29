import { OrderAPISchema } from '@/schemas';
import axios, { isAxiosError } from 'axios';

export default {
    async getAvailableOrders() {
        try {
            const { data } = await axios.get('/api/orders');
            const response = OrderAPISchema.safeParse(data);
            if (!response.success) {
                throw new Error('Datos inválidos');
            }

            return response.data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }

            throw new Error('Ocurrió un error');
        }
    },
    async getDeliveryOrders() {
        try {
            const { data } = await axios.get('/api/orders/delivery');
            const response = OrderAPISchema.safeParse(data);
            if (!response.success) {
                throw new Error('Datos inválidos');
            }

            return response.data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }

            throw new Error('Ocurrió un error');
        }
    }
};
