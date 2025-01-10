interface Props { 
    children?: React.ReactNode;
    onClick?: () => void;
}

export default ({children, onClick}: Props) => {
    return (
        <button onClick={onClick} className="uppercase font-bold text-xs tracking-wider p-4">{children}</button>
    )
}