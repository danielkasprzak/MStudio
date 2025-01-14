export const dayTranslations: { [key: string]: string } = {
    Monday: 'Poniedziałek',
    Tuesday: 'Wtorek',
    Wednesday: 'Środa',
    Thursday: 'Czwartek',
    Friday: 'Piątek',
    Saturday: 'Sobota',
    Sunday: 'Niedziela',
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatDateShortMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { month: 'short' });
};

export const formatDateOnlyDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {  day: 'numeric' });
};

export const formatDateWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const weekday = date.toLocaleDateString('pl-PL', { weekday: 'short' });
    return weekday.endsWith('.') ? weekday.slice(0, -1) : weekday;
};

export const generateReservationId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from(
        { length: 8 }, 
        () => chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
};