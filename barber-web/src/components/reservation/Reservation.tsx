import SidePanel from "./SidePanel"
import MainPanel from "./MainPanel";

export default () => {
    return (
        <div className='bg-stone-100 w-full h-full flex flex-row justify-center'>
            <SidePanel />
            <MainPanel />
        </div>
    )
}