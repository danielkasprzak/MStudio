interface Props {
    children?: React.ReactNode;
    padding?: string;
}

export default ({children, padding}: Props) => {
     <h1 className={`font-cormorant text-xl font-medium p-${padding}`}>{children}</h1>;
}