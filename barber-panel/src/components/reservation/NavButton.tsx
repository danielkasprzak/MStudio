interface NavButtonProps {
    children: React.ReactNode;
    isActive: boolean;
}

export default ({ children, isActive } : NavButtonProps) => {
    return (
        <button className={`py-3 m-4 text-normal font-montserrat tracking-wider font-semibold ${isActive ? "text-white" : "text-neutral-700"}`}>
            {children}
        </button>
    )
}