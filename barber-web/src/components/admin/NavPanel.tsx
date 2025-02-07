import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../utils/http";

import Title from "../Title";
import TextButton from "../TextButton";
import Label from "../Label";

export default () => {
    const [isVisible, setIsVisible] = useState(false);
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
        <div className='sticky top-0 w-screen h-auto md:w-auto md:h-screen bg-white border-b md:border-r border-stone-300 flex flex-col justify-between text-charcoal z-40'>
            <div className="flex flex-col items-center">
                <div className="hidden md:block">
                    <Title padding='16'>MSTUDIO</Title>
                </div>
                <div className="block md:hidden">
                    <Title padding='8'>MSTUDIO</Title>
                </div>

                <div className="flex flex-row md:flex-col flex-wrap items-center justify-center">
                    <Link to='/admin'>
                        <TextButton padding={2}>Panel</TextButton>
                    </Link>
                    <Link to='rezerwacje'>
                        <TextButton padding={2}>Rezerwacje</TextButton>
                    </Link>
                    <Link to='oferty'>
                        <TextButton padding={2}>Oferta</TextButton>
                    </Link>
                    <Link to='godziny-otwarcia'>
                        <TextButton padding={2}>Harmonogram</TextButton>
                    </Link>
                    <Link to='specjalne-godziny-otwarcia'>
                        <TextButton padding={2}>Dni wolne</TextButton>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col py-8 md:pb-8">
                {isPending ? <Label>Wylogowuje...</Label> : <TextButton onClick={handleLogout}>Wyloguj się</TextButton>}
            </div>
        </div>
    )
}