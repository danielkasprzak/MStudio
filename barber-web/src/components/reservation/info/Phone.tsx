import { Phone } from "lucide-react";

interface Props {
    children: React.ReactNode;
}

export default ({ children } : Props) => {
    return (
    <div className="mt-8 mb-4 w-full border border-stone-300 px-4 py-2 text-charcoal uppercase font-bold text-xs tracking-wider font-lato flex flex-row justify-center items-center">
        <div className="border-r border-stone-300 w-auto h-4 mr-3 flex justify-center items-center pr-3"><Phone color="#353535" size={16} strokeWidth={1.25} /></div>
        {children}
    </div>
    );
}