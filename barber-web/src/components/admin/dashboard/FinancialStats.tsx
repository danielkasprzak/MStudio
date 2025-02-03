import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFinancialStatistics } from "../../../utils/http";
import { FinancialStatistics } from "../../../interfaces/statisticsInterfaces";
import { getDateRange } from "../../../utils/utils";

import * as d3 from "d3";

import TextButton from "../../TextButton";
import Title from "../../Title";
import Label from "../../Label";

export default () => {
    const [period, setPeriod] = useState('1D');
    const { startDate, endDate } = getDateRange(period);
    const chartRef = useRef<SVGSVGElement | null>(null);

    const { data, error } = useQuery<FinancialStatistics>({
        queryKey: ['financialStats', { startDate, endDate }],
        queryFn: () => fetchFinancialStatistics({ startDate, endDate })
    });   

    useEffect(() => {
        console.log("Data fetched:", data);
        if (data) {
            const payments = generatePaymentsData(data.averagePayment, startDate, endDate, period);
            drawChart({ ...data, payments });
        }
    }, [data]);

    const generatePaymentsData = (averagePayment: number, startDate: string, endDate: string, period: string) => {
        const payments = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        console.log(start);

        if (period === '1D') {
            payments.push({ date: start.toISOString().split('T')[0], averagePayment });
        } else if (period === '1T') {
            for (let i = 0; i < 7; i++) {
                payments.push({
                    date: new Date(start.getTime() + i * (1000 * 3600 * 24)).toISOString().split('T')[0],
                    averagePayment
                });
            }
        } else if (period === '1M') {
            for (let i = 0; i < 4; i++) {
                payments.push({
                    date: new Date(start.getTime() + i * (1000 * 3600 * 24 * 7)).toISOString().split('T')[0],
                    averagePayment
                });
            }
        } else if (period === '1R') {
            for (let i = 0; i < 12; i++) {
                payments.push({
                    date: new Date(start.getFullYear(), start.getMonth() + i, 1).toISOString().split('T')[0],
                    averagePayment
                });
            }
        } else if (period === 'ALL') {
            for (let i = 0; i < 5; i++) { // Assuming 5 years of data
                payments.push({
                    date: new Date(start.getFullYear() + i, 0, 1).toISOString().split('T')[0],
                    averagePayment
                });
            }
        }

        return payments;
    };

    const drawChart = (data: FinancialStatistics & { payments: { date: string; averagePayment: number }[] }) => {
        if (!chartRef.current || !Array.isArray(data.payments)) return;

        const svg = d3.select(chartRef.current)
            .attr("width", 600)
            .attr("height", 400)
            .style("margin", 50);

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleTime()
            .domain([new Date(startDate), new Date(endDate)])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data.payments, d => d.averagePayment) || 0])
            .range([height, 0]);

        const line = d3.line<{ date: string; averagePayment: number }>()
            .x(d => xScale(new Date(d.date)))
            .y(d => yScale(d.averagePayment));

        g.append("path")
            .datum(data.payments)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(d3.timeDay.every(1)));

        g.append("g")
            .call(d3.axisLeft(yScale));

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Average Payment Over Time");
    };



    if (error) return <Label>Error loading financial statistics</Label>;

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
            <svg ref={chartRef}></svg>
        </div>
    );
}