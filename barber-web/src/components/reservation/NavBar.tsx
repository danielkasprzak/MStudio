import { NavLink } from "react-router-dom"
import NavButton from "./NavButton"

export default () => {
    return (
        <div className='w-[46rem] h-auto py-4 flex flex-row items-center justify-end relative overflow-hidden'>
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
    )
}