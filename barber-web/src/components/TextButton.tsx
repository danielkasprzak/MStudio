interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    isActive?: boolean;
}

export default ({ children, onClick, type, isActive } : Props) => {
    
    let textColor = "text-charcoal";
    if (isActive !== undefined) {
        textColor = isActive ? "text-charcoal" : "text-stone-400";
    }
    
    return (
        <button type={type} onClick={onClick} className={`${textColor} font-lato font-bold uppercase text-xs outline-none tracking-wider border-stone-300 px-4 py-2`}>
            {children}
        </button>
    );
}