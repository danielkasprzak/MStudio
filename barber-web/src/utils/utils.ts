export const dayTranslations: { [key: string]: string } = {
    Monday: 'Poniedziałek',
    Tuesday: 'Wtorek',
    Wednesday: 'Środa',
    Thursday: 'Czwartek',
    Friday: 'Piątek',
    Saturday: 'Sobota',
    Sunday: 'Niedziela',
};

export const WEEK_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatDateNoTime = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

export const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const getDateRange = (period: string) => {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
        case '1D':
            startDate.setDate(now.getDate() - 1);
            break;
        case '1T':
            startDate.setMonth(now.getMonth() - 1);
            break;
        case '1M':
            startDate.setMonth(now.getMonth() - 1);
            break;
        case '1R':
            startDate.setFullYear(now.getFullYear() - 1);
            break;
        default:
            startDate = new Date(0);
    }

    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: now.toISOString().split('T')[0]
    };
};