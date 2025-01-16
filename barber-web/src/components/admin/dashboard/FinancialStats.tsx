import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFinancialStatistics } from "../../../utils/http";
import { FinancialStatistics } from "../../../interfaces/statisticsInterfaces";
import { getDateRange } from "../../../utils/utils";

import TextButton from "../../TextButton";
import Title from "../../Title";

export default () => {
    const [period, setPeriod] = useState('1D');
    const { startDate, endDate } = getDateRange(period);

    const { data, error } = useQuery<FinancialStatistics>({
        queryKey: ['financialStats', { startDate, endDate }],
        queryFn: () => fetchFinancialStatistics({ startDate, endDate })
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
            <div className="font-lato text-charcoal font-bold text-xl">Całkowity dochód: {data?.totalPayments}zł</div>
            <div className="font-lato text-charcoal font-bold text-xl">Średni dochód na rezerwacje: {data?.averagePayment}zł</div>
        </div>
    );
}