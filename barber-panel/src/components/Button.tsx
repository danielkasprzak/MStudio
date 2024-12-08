interface ButtonProps {
    children: React.ReactNode;
}

export default ({ children } : ButtonProps) => {
    return <button className="py-3 m-2 w-80 rounded-3xl border-neutral-900 border text-white font-montserrat tracking-wide">{children}</button>
}