import useDocumentTitle from "../../hooks/useDocumentTitle";
import { checkAuth } from "../../utils/http";

import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";

export default () => {
    useDocumentTitle("MStudio - rezerwacja");

    return (
        <>
            <div className='bg-stone-100 w-full h-full hidden md:flex flex-col items-center md:flex-row md:justify-center md:items-start'>
                <SidePanel />
                <MainPanel />
            </div>
            <div className='bg-stone-100 w-full h-full relative md:hidden flex flex-col items-center md:flex-row md:justify-center md:items-start'>
                <MainPanel />
                <SidePanel />
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