import useDocumentTitle from "../../hooks/useDocumentTitle";
import { checkAuth } from "../../utils/http";

import MainPanel from "./MainPanel"
import SidePanel from "./SidePanel"

export default () => {
    useDocumentTitle("MStudio - panel administratora");

    return (
        <div className="bg-stone-100 h-full w-full flex flex-row justify-center">
            <SidePanel />
            <MainPanel />
        </div>
    )
}

export async function loader() {
    const auth = await checkAuth();
    if (!auth || !auth.roles.includes('admin')) {
      throw new Response('Forbidden', { status: 403 });
    }
    return auth;
}