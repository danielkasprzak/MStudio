import Offer from "./Offer"

export default () => {
    return (
        <div className="h-auto w-auto">
            <ul className='w-[46rem] h-fit bg-dark-foreground rounded-2xl px-8 pt-8 pb-4'>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
            </ul>
        </div>
    )
}