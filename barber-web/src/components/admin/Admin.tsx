import useDocumentTitle from "../../hooks/useDocumentTitle";
import { checkAuth } from "../../utils/http";

import MainPanel from "./MainPanel"
import NavPanel from "./NavPanel"

export default () => {
    useDocumentTitle("MStudio - panel administratora");

    return (
        <div className="bg-stone-100 h-full w-full flex flex-col items-center justify-start md:flex-row md:items-start md:justify-center">
            <NavPanel />
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