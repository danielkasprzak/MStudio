import { NavLink } from "react-router-dom";

import NavButton from "./NavButton";
import UserInfo from "./UserInfo";
import BasketButton from "./BasketButton";

export default () => {
    return (
        <div className='w-full sticky border-stone-300 border-b md:border-none bg-white md:bg-stone-100 top-0 left-0 md:w-[46rem] h-auto py-2 md:py-4 flex flex-row items-center justify-between md:relative overflow-hidden z-40'>
            <div className="flex flex-row items-center">
                <BasketButton />
                <UserInfo />
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