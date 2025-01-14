interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default ({ children, onClick, type } : Props) => {
    return (
        <button type={type} onClick={onClick} className="font-lato font-bold uppercase text-xs tracking-wider text-charcoal border-stone-300 px-4 py-2">
            {children}
        </button>
    );
}