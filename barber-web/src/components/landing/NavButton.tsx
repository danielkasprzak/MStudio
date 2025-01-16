interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    menuOpen?: boolean;
}

export default ({children, onClick, menuOpen} : Props) => {
    return (
        <button onClick={onClick} className={`font-cormorant font-normal uppercase text-normal p-4 ${menuOpen ? 'text-charcoal' : 'text-white'}`}>{children}</button>
    );
}