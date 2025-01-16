import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchReservationsStatistics } from "../../../utils/http";
import { ReservationsStatistics } from "../../../interfaces/statisticsInterfaces";
import { getDateRange } from "../../../utils/utils";

import TextButton from "../../TextButton";
import Title from "../../Title";

export default () => {
    const [period, setPeriod] = useState('1D');
    const { startDate, endDate } = getDateRange(period);

    const { data, error } = useQuery<ReservationsStatistics>({
        queryKey: ['reservationsStats', { startDate, endDate }],
        queryFn: () => fetchReservationsStatistics({ startDate, endDate })
    });   

    if (error) return <div>Error loading offers</div>;

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
            <div className="font-lato text-charcoal font-bold text-xl">Suma rezerwacji: {data?.totalReservations}</div>
        </div>
    );
}