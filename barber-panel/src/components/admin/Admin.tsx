import MainPanel from "./MainPanel"
import SidePanel from "./SidePanel"

export default () => {
    return (
        <div className="bg-slate-200 h-full w-full flex flex-row justify-center">
            <SidePanel />
            <MainPanel />
        </div>
    )
}