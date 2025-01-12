interface Props {
    children: React.ReactNode;
    onClick: () => void;
}

export default ({ children, onClick } : Props) => {
    return <button onClick={onClick} className="py-3 m-4 w-80 border border-stone-300 text-charcoal uppercase font-bold text-xs tracking-wider font-lato">{children}</button>;
}