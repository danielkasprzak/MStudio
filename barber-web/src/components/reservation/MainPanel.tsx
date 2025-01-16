import { Outlet } from "react-router-dom";

import NavBar from "./nav/NavBar";

export default () => {
    return (
        <div className='flex flex-col justify-start py-8 ml-4 z-10'>
            <NavBar />
            <Outlet />
        </div>
    )
}