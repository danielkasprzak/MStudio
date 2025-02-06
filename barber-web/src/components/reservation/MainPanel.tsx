import { Outlet } from "react-router-dom";

import NavBar from "./nav/NavBar";

export default () => {
    return (
        <div className='w-screen relative md:w-auto flex flex-col justify-start md:py-8 md:ml-4 z-10'>
            <NavBar />
            <div className="w-full relative flex justify-center items-center mt-8 md:mt-0">
                <Outlet />
            </div>
        </div>
    )
}