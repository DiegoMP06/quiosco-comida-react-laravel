import { UserAddressAPISchema } from '@/schemas';
import axios, { isAxiosError } from 'axios';

export default {
    async getAllAddresses() {
        try {
            const { data } = await axios.get('/api/user-addresses');
            const response = UserAddressAPISchema.safeParse(data);
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
};
