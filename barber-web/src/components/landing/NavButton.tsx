interface Props {
    children?: React.ReactNode;
}

export default ({children} : Props) => {
    return (
        <button className='font-cormorant font-normal uppercase text-normal text-white p-4'>{children}</button>
    );
}