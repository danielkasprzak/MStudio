import { NavLink } from "react-router-dom";
import { fetchUserInfo } from "../../utils/http";
import { motion } from "motion/react";

import NavButton from "./NavButton";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import FlatButton from "../FlatButton";

interface UserInfo {
    email: string;
    name: string;
    picture: string;
}

export default () => {
    const { data = [], error } = useQuery<UserInfo>({
        queryKey: ['userInfo'],
        queryFn: fetchUserInfo
    });

    const [isContextVisible, setIsContextVisible] = useState(false);
    const contextRef = useRef<HTMLDivElement>(null);

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


    if (error) return <div>Error loading offers</div>;

    const handleImageClick = () => {
        setIsContextVisible((prev) => !prev);
    };

    return (
        <div className='w-[46rem] h-auto py-4 flex flex-row items-center justify-between relative overflow-hidden z-40'>
            <div className="flex flex-row items-center">
            {Array.isArray(data) ? null : (
                    <>
                        <img
                            src={data.picture}
                            alt={data.name}
                            className="w-12 h-auto rounded-full mr-4 cursor-pointer"
                            onClick={handleImageClick}
                        />
                        <p className="font-medium font-cormorant text-xl text-charcoal">{data.name}</p>
                        {isContextVisible && (
                            <motion.div
                            ref={contextRef}
                                className="z-50 absolute top-0 left-0 bg-white border border-stone-300 p-4 flex flex-col justify-center"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <p className="font-lato text-xs font-medium text-charcoal pb-2">{data.email}</p>
                                <FlatButton disabled={false} isActive={false}>Wyloguj</FlatButton>
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