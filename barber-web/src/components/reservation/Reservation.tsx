import useDocumentTitle from "../../hooks/useDocumentTitle";
import { checkAuth } from "../../utils/http";

import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";
import BasketSidePanel from "./basket/BasketSidePanel";

export default () => {
    useDocumentTitle("MStudio - rezerwacja");

    return (
        <>
            <div className='bg-stone-100 w-full h-full hidden md:flex flex-row items-start justify-center'>
                <SidePanel />
                <MainPanel />
            </div>
            <div className='bg-stone-100 w-full h-full relative md:hidden flex flex-col items-center'>
                <BasketSidePanel                 
                    isActive
                    onHover={undefined} 
                    activeHeight="100%"
                    inactiveHeight="auto"
                    isMobile
                />
                <MainPanel />
                <SidePanel isTraditional isMobile />
            </div>
        </>
    );
}

export async function loader() {
    const auth = await checkAuth();
    if (!auth) {
      throw new Response('Forbidden', { status: 403 });
    }
    return auth;
}