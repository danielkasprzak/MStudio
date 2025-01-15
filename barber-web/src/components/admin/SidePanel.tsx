import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/http";

import Title from "../Title";
import { useMutation } from "@tanstack/react-query";
import TextButton from "../TextButton";

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
        <div className='sticky top-0 h-screen bg-white border-r border-stone-300 w-auto flex flex-col justify-between text-charcoal'>
            <div className="flex flex-col items-center">
                <Title padding='16'>MSTUDIO</Title>

                <TextButton>Panel</TextButton>
                <Link to='rezerwacje'>
                    <TextButton>Rezerwacje</TextButton>
                </Link>
                <Link to='oferty'>
                    <TextButton>Oferta</TextButton>
                </Link>
                <Link to='godziny-otwarcia'>
                    <TextButton>Harmonogram</TextButton>
                </Link>
                <Link to='specjalne-godziny-otwarcia'>
                    <TextButton>Specjalne</TextButton>
                </Link>
            </div>
            <div className="flex flex-col pb-8">
                {isPending ? <div>Wylogowuje...</div> : <TextButton onClick={handleLogout}>Wyloguj się</TextButton>}
            </div>
        </div>
    )
}