import useDocumentTitle from "../../hooks/useDocumentTitle";
import { checkAuth } from "../../utils/http";

import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";

export default () => {
    useDocumentTitle("MStudio - rezerwacja");

    return (
        <div className='bg-stone-100 w-full h-full flex flex-row justify-center'>
            <SidePanel />
            <MainPanel />
        </div>
    );
}

export async function loader() {
    const auth = await checkAuth();
    if (!auth) {
      throw new Response('Forbidden', { status: 403 });
    }
    return auth;
}