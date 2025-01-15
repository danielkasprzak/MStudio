interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
}


export default ({ children, onClick } : Props) => {
    return (
        <button className="bg-charcoal/20 font-lato font-bold text-white text-xs tracking-wider uppercase px-4 py-2 z-30" onClick={onClick}>{children}</button>
    );
}