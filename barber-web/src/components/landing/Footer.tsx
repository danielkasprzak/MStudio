import SmallAnchor from "./SmallAnchor";

export default () => {

    return (  
        <footer className="relative w-full h-auto bg-white text-charcoal font-lato flex flex-row items-center justify-center p-16 z-10">
            <h3 className="font-cormorant font-medium text-xl p-16">MSTUDIO</h3>
            <div className="flex flex-col justify-center p-16">
                <SmallAnchor>Wstęp</SmallAnchor>
                <SmallAnchor>Poznaj nas</SmallAnchor>
                <SmallAnchor>Oferta</SmallAnchor>
                <SmallAnchor>Rezerwacja</SmallAnchor>
            </div>
            <div className="flex flex-col justify-center p-16">
                <SmallAnchor>Facebook</SmallAnchor>
                <SmallAnchor>Instagram</SmallAnchor>
                <SmallAnchor>TikTok</SmallAnchor>
            </div>
        </footer>
    );
};