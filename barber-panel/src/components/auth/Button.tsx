interface Props {
    children: React.ReactNode;
    onClick: () => void;
}

export default ({ children, onClick } : Props) => {
    return <button onClick={onClick} className="py-3 m-4 w-80 rounded-3xl border-neutral-900 border text-white text-sm font-montserrat tracking-wider font-light">{children}</button>;
}