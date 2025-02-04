import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFinancialStatistics, fetchFinancialChartData } from "../../../utils/http";
import { FinancialStatistics } from "../../../interfaces/statisticsInterfaces";
import { getDateRange } from "../../../utils/utils";
import { LineChart } from '@mui/x-charts';


import TextButton from "../../TextButton";
import Title from "../../Title";
import Label from "../../Label";

interface PaymentData {
    date: string;
    averagePayment: number;
}

export default () => {
    const [period, setPeriod] = useState('1D');
    const { startDate, endDate } = getDateRange(period);

    const { data, error } = useQuery<FinancialStatistics>({
        queryKey: ['financialStats', { startDate, endDate }],
        queryFn: () => fetchFinancialStatistics({ startDate, endDate })
    });

    const { data: chartData, error: chartError } = useQuery<any>({
        queryKey: ['financialChartData', { startDate, endDate, period }],
        queryFn: () => fetchFinancialChartData({ startDate, endDate, period }),
        enabled: period !== '1D' // Disable fetching chart data for '1D' period
    });

    const generatePaymentsData = (data: any): PaymentData[] => {
        return Object.keys(data).map(date => ({
            date,
            averagePayment: Number(data[date])
        }));
    };

    if (error || chartError) return <Label>Error loading financial statistics</Label>;

    const payments = chartData ? generatePaymentsData(chartData) : [];

    console.log("Payments data:", payments);

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
            <div className="font-lato text-charcoal uppercase font-bold text-xs">Całkowity dochód: {data?.totalPayments}zł</div>
            <div className="font-lato text-charcoal uppercase font-bold text-xs">Średni dochód na rezerwacje: {data?.averagePayment}zł</div>
            <LineChart
                dataset={payments as any}
                xAxis={[{ dataKey: 'date', scaleType: 'linear'}]}
                series={[{ dataKey: 'averagePayment', color: '#d6d3d1', area: true }]}
                height={300}
                width={500}
            />
        </div>
    );
}