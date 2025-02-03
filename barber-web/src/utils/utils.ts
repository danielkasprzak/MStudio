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
    let startDate = new Date(now);
    let endDate = new Date(now);
    
    switch (period) {
        case '1D':
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
        case '1T':
            const firstDayOfWeek = now.getDate() - now.getDay();
            startDate = new Date(now.setDate(firstDayOfWeek));
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(now.setDate(firstDayOfWeek + 6));
            endDate.setHours(23, 59, 59, 999);
            break;
        case '1M':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
        case '1R':
            startDate = new Date(now.getFullYear(), 0, 1);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(now.getFullYear(), 11, 31);
            endDate.setHours(23, 59, 59, 999);
            break;
        default:
            startDate = new Date(0);
            endDate = new Date();
            break;
    }
    
    const formatDate = (date: Date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    console.log(formatDate(startDate), formatDate(endDate));
    return { startDate: formatDate(startDate), endDate: formatDate(endDate) };
};