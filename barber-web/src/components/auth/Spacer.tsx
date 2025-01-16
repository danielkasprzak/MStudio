interface Props {
    children: React.ReactNode;
}

export default ({ children } : Props) => {
    return <div className="w-60 flex items-center uppercase font-bold text-xs tracking-wider font-lato mt-2 mb-2 text-stone-400 
    before:content-[''] before:border-t before:block before:flex-1 before:border-stone-300 before:mr-2
    after:content-[''] after:border-t after:block after:flex-1 after:border-stone-300 after:ml-2">{children}</div>
}