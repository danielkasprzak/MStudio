import { Link } from "react-router-dom";
import SmallAnchor from "./SmallAnchor";

export default () => {

    return (  
        <footer className="relative w-full h-auto bg-white text-charcoal font-lato flex flex-row items-center justify-center py-16 px-8 sm:px-16 z-10">
            <h3 className="font-cormorant font-medium text-xl py-16 px-8 sm:px-16">MSTUDIO</h3>
            <div className="flex flex-col justify-center py-16 px-8 sm:px-16">
                <SmallAnchor>Wstęp</SmallAnchor>
                <SmallAnchor>Poznaj nas</SmallAnchor>
                <SmallAnchor>Oferta</SmallAnchor>
                <Link to='/rezerwacja'>
                    <SmallAnchor>Rezerwacja</SmallAnchor>
                </Link>   
            </div>
            <div className="flex flex-col justify-center py-16 px-8 sm:px-16">
                <SmallAnchor>Facebook</SmallAnchor>
                <SmallAnchor>Instagram</SmallAnchor>
                <SmallAnchor>TikTok</SmallAnchor>
            </div>
        </footer>
    );
};