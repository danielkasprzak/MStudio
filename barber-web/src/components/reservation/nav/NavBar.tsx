import { NavLink } from "react-router-dom";

import NavButton from "./NavButton";
import UserInfo from "./UserInfo";

export default () => {
    return (
        <div className='w-[46rem] h-auto py-4 flex flex-row items-center justify-between relative overflow-hidden z-40'>
            <UserInfo />

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