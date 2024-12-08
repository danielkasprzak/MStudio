interface NavButtonProps {
    children: React.ReactNode;
}

export default ({ children } : NavButtonProps) => {
    return <button className="py-3 m-4 text-neutral-700 text-normal font-montserrat tracking-wider font-semibold">{children}</button>
}