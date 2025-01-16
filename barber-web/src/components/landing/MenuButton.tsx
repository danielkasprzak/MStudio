interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
}

export default ({children, onClick} : Props) => {
    return (
        <button onClick={onClick} className='font-cormorant font-normal uppercase text-sm p-4 pb-6 text-charcoal'>{children}</button>
    );
}