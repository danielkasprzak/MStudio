
interface Props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    forOffers?: boolean;
}

export default ({ searchTerm, setSearchTerm, forOffers } : Props) => {
    return (
        <input
        type="text"
        placeholder={forOffers ? "Szukaj ofert..." : "Szukaj po id, adresie email lub numerze telefonu..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full ${forOffers ? 'ml-4' : ''} uppercase text-xs text-charcoal font-bold font-lato py-2 px-4 outline-none border border-stone-300`}
        />
    );
}