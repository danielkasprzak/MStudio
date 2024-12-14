interface TitleProps {
    children: React.ReactNode;
}

export default ({ children } : TitleProps) => {
    return (
        <h2 className="font-montserrat text-2xl text-white font-semibold tracking-wider">{children}</h2>
    )
}