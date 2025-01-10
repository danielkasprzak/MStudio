interface Props { 
    children?: React.ReactNode;
}

export default ({children}: Props) => {
    return (
        <button className="uppercase font-bold text-xs tracking-wider p-4">{children}</button>
    )
}