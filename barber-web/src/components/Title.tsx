interface Props {
    children?: React.ReactNode;
    padding?: string;
}

export default ({children, padding}: Props) => {
    return <h1 className={`font-cormorant text-xl font-medium text-charcoal uppercase p-${padding}`}>{children}</h1>;
}