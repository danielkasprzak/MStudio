interface Props { 
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default ({children, onClick, type}: Props) => {
    return (
        <button onClick={onClick} type={type} className="uppercase font-bold text-xs tracking-wider p-4">{children}</button>
    )
}