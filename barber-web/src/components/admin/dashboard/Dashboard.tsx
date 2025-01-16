import FinancialStats from "./FinancialStats";
import ReservationsStats from "./ReservationsStats";

export default () => {
    return (
        <div className='w-full h-full p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <ReservationsStats />
                <FinancialStats />
            </div>
        </div>
    );
}