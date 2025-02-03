export interface ReservationsStatistics {
    totalReservations: number;
    cancelledReservations: number;
    completedReservations: number;
    activeReservations: number;
}

export interface FinancialStatistics {
    totalPayments: number;
    averagePayment: number;
}