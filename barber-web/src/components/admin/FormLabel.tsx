interface Props {
    children?: React.ReactNode;
    htmlFor: string;
}

export default ({ children, htmlFor } : Props) => {
    return (
        <label htmlFor={htmlFor} className="font-lato text-xs uppercase font-bold text-charcoal">{children}</label>
    );
}