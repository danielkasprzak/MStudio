import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/http";

import SmallButton from "./SmallButton";
import Title from "./Title";
import { useMutation } from "@tanstack/react-query";

export default () => {
    const navigate = useNavigate();
    
    const { mutate, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate('/login');
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        }
    });
    
    function handleLogout() {
        mutate();
    }    

    return (
        <div className='sticky top-0 h-screen bg-white w-auto flex flex-col justify-between text-charcoal'>
            <div className="flex flex-col">
                <Title padding='16'>MSTUDIO</Title>

                <SmallButton>Panel</SmallButton>
                <SmallButton><Link to={`rezerwacje`}>Rezerwacje</Link></SmallButton>
                <SmallButton><Link to={`oferty`}>Oferta</Link></SmallButton>
                <SmallButton><Link to={`godziny-otwarcia`}>Harmonogram</Link></SmallButton>
                <SmallButton><Link to={`specjalne-godziny-otwarcia`}>Specjalne</Link></SmallButton>
            </div>
            <div className="flex flex-col pb-8">
                <SmallButton>Powrót</SmallButton>
                {isPending ? <div>Wylogowuje...</div> : <SmallButton onClick={handleLogout}>Wyloguj się</SmallButton>}
            </div>
        </div>
    )
}