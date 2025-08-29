export const formatCurrency = (quantity: number) => {
    return Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(quantity);
}

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
}

export const formatDateFromUrl = (date: Date) => {
 const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}
