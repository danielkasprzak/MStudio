import MainPanel from "./MainPanel"
import SidePanel from "./SidePanel"

export default () => {
    return (
        <div className="bg-slate-300 h-screen w-screen flex flex-row justify-center">
            <SidePanel />
            <MainPanel />
        </div>
    )
}