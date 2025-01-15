import { NavLink, useNavigate } from "react-router-dom";
import { fetchUserInfo, logout } from "../../utils/http";
import { motion } from "motion/react";

import NavButton from "./NavButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import FlatButton from "../FlatButton";

interface UserInfo {
    email: string;
    name: string;
    picture: string;
}

export default () => {
    const navigate = useNavigate();
    const [isContextVisible, setIsContextVisible] = useState(false);
    const contextRef = useRef<HTMLDivElement>(null);

    const { data = [], error } = useQuery<UserInfo>({
        queryKey: ['userInfo'],
        queryFn: fetchUserInfo
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contextRef.current && !contextRef.current.contains(event.target as Node)) {
                setIsContextVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const { mutate, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate('/login');
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        }
    });

    if (error) return <div>Error loading offers</div>;

    const handleImageClick = () => {
        setIsContextVisible((prev) => !prev);
    };
    
    function handleLogout() {
        mutate();
    }

    return (
        <div className='w-[46rem] h-auto py-4 flex flex-row items-center justify-between relative overflow-hidden z-40'>
            <div onClick={handleImageClick} className="flex flex-row items-center hover:cursor-pointer">
            {Array.isArray(data) ? null : (
                    <>
                        <img
                            src={data.picture}
                            alt={data.name}
                            className="w-12 h-auto rounded-full mr-4"
                        />
                        <p className="font-medium font-cormorant text-xl text-charcoal">{data.name}</p>
                        {isContextVisible && (
                            <motion.div
                                ref={contextRef}
                                className="z-50 absolute top-0 left-16 bg-white border border-stone-300 p-4 flex flex-col justify-center"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <p className="font-lato text-xs font-medium text-charcoal pb-2">{data.email}</p>
                                {isPending ? <div className="font-lato text-xs uppercase font-bold text-charcoal">Wylogowuje...</div> : <FlatButton onClick={handleLogout} disabled={false} isActive={false}>Wyloguj</FlatButton>}
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            <div className="flex flex-row items-center">
                <NavLink to="/rezerwacja/moje-rezerwacje">
                    {({ isActive }) => (
                        <NavButton isActive={isActive}>
                            Moje rezerwacje
                        </NavButton>
                    )}
                </NavLink>
                <NavLink to="/rezerwacja" end>
                    {({ isActive }) => (
                        <NavButton isActive={isActive}>
                            Rezerwacja
                        </NavButton>
                    )}
                </NavLink>
            </div>
        </div>
    )
}