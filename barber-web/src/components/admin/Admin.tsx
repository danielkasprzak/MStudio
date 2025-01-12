import useDocumentTitle from "../../hooks/useDocumentTitle";

import MainPanel from "./MainPanel"
import SidePanel from "./SidePanel"

export default () => {
    useDocumentTitle("MStudio - Panel administratora");

    return (
        <div className="bg-stone-100 h-full w-full flex flex-row justify-center">
            <SidePanel />
            <MainPanel />
        </div>
    )
}