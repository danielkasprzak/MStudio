interface TitleProps {
    children: React.ReactNode;
}

export default ({ children } : TitleProps) => {
    return (
        <h2 className="font-cormorant text-xl font-medium uppercase text-charcoal">{children}</h2>
    )
}