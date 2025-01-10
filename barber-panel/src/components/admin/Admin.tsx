import MainPanel from "./MainPanel"
import SidePanel from "./SidePanel"

export default () => {
    return (
        <div className="bg-slate-200 h-screen w-screen flex flex-row justify-center overflow-hidden">
            <SidePanel />
            <MainPanel />
        </div>
    )
}