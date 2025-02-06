import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo, logout } from "../../../utils/http";

import FlatButton from "../../FlatButton";
import Label from "../../Label";
import { User } from "lucide-react";

interface UserInfo {
    email: string;
    name: string;
    picture: string;
}

export default () => {
    const navigate = useNavigate();
    const [isContextVisible, setIsContextVisible] = useState(false);
    const [imageError, setImageError] = useState(false);
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

    const handleImageError = () => {
        setImageError(true);
    };

    const handleUserContext = () => {
        setIsContextVisible((prev) => !prev);
    };
    
    function handleLogout() {
        mutate();
    }

    return (
        <div onClick={handleUserContext} className="flex flex-row ml-4 md:ml-0 items-center hover:cursor-pointer">
            {Array.isArray(data) ?
                <div className="w-8 h-auto md:w-10 md:h-10 bg-stone-300 rounded-full mr-2 md:mr-4 flex items-center justify-center">
                    <User color="#FFFFFF" size={20} strokeWidth={1.25} />
                </div> : (
                    <>
                        {imageError ? (
                            data.name ? (
                                <div className="w-8 h-auto md:w-10 md:h-10 bg-stone-300 rounded-full mr-2 md:mr-4 flex items-center justify-center">
                                    <span className="text-white font-bold">{data.name.charAt(0)}</span>
                                </div>
                            ) : (
                                <div className="w-8 h-auto md:w-10 md:h-10 bg-stone-300 rounded-full mr-2 md:mr-4 flex items-center justify-center">
                                    <User color="#FFFFFF" size={20} strokeWidth={1.25} />
                                </div>
                            )
                        ) : (
                            <img
                                src={data.picture}
                                alt={data.name}
                                className="w-8 h-auto md:w-10 rounded-full mr-2 md:mr-4"
                                onError={handleImageError}
                            />
                        )}
                        <p className="font-medium font-cormorant text-normal md:text-xl text-charcoal">{data.name}</p>
                        {isContextVisible && (
                            <motion.div
                                ref={contextRef}
                                className="z-50 absolute top-4 left-16 bg-white border border-stone-300 p-4 flex flex-col justify-center"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <p className="font-lato text-xs font-medium text-charcoal pb-2">{data.email}</p>
                                {isPending ? <Label>Wylogowuje...</Label> : <FlatButton onClick={handleLogout} disabled={false} isActive={false}>Wyloguj</FlatButton>}
                            </motion.div>
                        )}
                    </>
                )}
        </div>        
    );
}