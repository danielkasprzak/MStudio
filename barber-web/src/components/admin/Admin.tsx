import MainPanel from "./MainPanel"
import SidePanel from "./SidePanel"

export default () => {
    return (
        <div className="bg-stone-100 h-full w-full flex flex-row justify-center">
            <SidePanel />
            <MainPanel />
        </div>
    )
}