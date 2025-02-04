interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    isActive?: boolean;
    padding?: number;
}

export default ({ children, onClick, type, isActive, padding } : Props) => {
    
    let textColor = "text-charcoal";
    if (isActive !== undefined) {
        textColor = isActive ? "text-charcoal" : "text-stone-400";
    }

    let paddingClass = "";
    if (padding !== undefined) {
        paddingClass = `py-${padding}`
    }
    
    return (
        <button type={type} onClick={onClick} className={`${textColor} ${paddingClass} font-lato font-bold uppercase text-xs outline-none tracking-wider border-stone-300 px-4`}>
            {children}
        </button>
    );
}