export default () => {
    return (
    <li className="mb-4 w-full font-montserrat border border-neutral-800 rounded-xl text-neutral-300 flex flex-row justify-between py-4 px-6">
        <div className="flex flex-col justify-center items-start">
            <div className="flex flex-row justify-start items-center">
                <h1 className="text-2xl font-semibold text-white">Strzyżenie męskie</h1>
                <p className="text-sm pl-3">40min</p>
            </div>
            <p className="text-sm font-normal text-balance">Ugułem strzyżenie boże, aliganckie dla jego, bardzo dobre. Ugułem strzyżenie boże, aliganckie dla jego. Ugułem strzyżenie boże, aliganckie dla jego. Ugułem strzyżenie boże, aliganckie dla jego.</p>
        </div>
        <div className="flex flex-row items-center justify-end pl-4">
            <p className="text-white font-semibold text-sm px-3 text-nowrap">$ 45PLN</p>
            <button className="border border-neutral-800 rounded-full py-1 px-4">Umów</button>
        </div>
    </li>
    )
}