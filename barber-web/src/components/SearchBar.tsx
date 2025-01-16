
interface Props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default ({ searchTerm, setSearchTerm } : Props) => {
    return (
        <input
        type="text"
        placeholder="Szukaj ofert..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full ml-4 uppercase text-xs text-charcoal font-bold font-lato py-2 px-4 outline-none border border-stone-300"
        />
    );
}