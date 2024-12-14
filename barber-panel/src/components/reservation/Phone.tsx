interface PhoneProps {
    children: React.ReactNode;
}

export default ({ children } : PhoneProps) => {
    return <div className="mt-8 w-full font-montserrat font-normal border border-neutral-800 px-4 py-2 rounded-xl tracking-wide text-neutral-300 flex flex-row justify-center items-center">
        <div className="border-r border-neutral-800 w-auto h-4 mr-3 flex justify-center items-center pr-3">TEL</div>
        {children}
    </div>
}