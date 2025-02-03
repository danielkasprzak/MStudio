import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchReservationsStatistics } from "../../../utils/http";
import { ReservationsStatistics } from "../../../interfaces/statisticsInterfaces";
import { getDateRange } from "../../../utils/utils";

import TextButton from "../../TextButton";
import Title from "../../Title";
import Label from "../../Label";

export default () => {
    const [period, setPeriod] = useState('1D');
    const { startDate, endDate } = getDateRange(period);

    const { data, error } = useQuery<ReservationsStatistics>({
        queryKey: ['reservationsStats', { startDate, endDate }],
        queryFn: () => fetchReservationsStatistics({ startDate, endDate })
    });   

    if (error) return <Label>Error loading reservations statistics</Label>;

    return (
        <div className="p-16 bg-white border border-stone-300">
            <Title>Statystyka rezerwacji</Title>

            <div className="flex flex-row items-center my-4 border border-stone-300 w-fit">
                <TextButton isActive={period === '1D'} onClick={() => setPeriod('1D')}>1D</TextButton>
                <TextButton isActive={period === '1T'} onClick={() => setPeriod('1T')}>1T</TextButton>
                <TextButton isActive={period === '1M'} onClick={() => setPeriod('1M')}>1M</TextButton>
                <TextButton isActive={period === '1R'} onClick={() => setPeriod('1R')}>1R</TextButton>
                <TextButton isActive={period === 'ALL'} onClick={() => setPeriod('ALL')}>Całkowita</TextButton>
            </div>
            <div className="font-lato text-charcoal uppercase font-bold text-xs">Suma rezerwacji: {data?.totalReservations}</div>
            <div className="font-lato text-charcoal uppercase font-bold text-xs">Aktywne rezerwacje: {data?.activeReservations}</div>
            <div className="font-lato text-charcoal uppercase font-bold text-xs">Zakończone rezerwacje: {data?.completedReservations}</div>
            <div className="font-lato text-charcoal uppercase font-bold text-xs">Anulowane rezerwacje: {data?.cancelledReservations}</div>
        </div>
    );
}