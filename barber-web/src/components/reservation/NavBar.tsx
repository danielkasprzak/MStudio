import { NavLink } from "react-router-dom";
import { fetchUserInfo } from "../../utils/http";

import NavButton from "./NavButton";
import { useQuery } from "@tanstack/react-query";

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

    if (error) return <div>Error loading offers</div>;

    return (
        <div className='w-[46rem] h-auto py-4 flex flex-row items-center justify-between relative overflow-hidden'>
            <div className="flex flex-row items-center">
                {Array.isArray(data) ? null : <img src={data.picture} alt={data.name} className="w-12 h-auto rounded-full mr-4" />}
                {Array.isArray(data) ? null : <p className="font-medium font-cormorant text-xl text-charcoal">{data.name}</p>}
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