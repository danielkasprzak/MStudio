import SidePanel from "./SidePanel"
import MainPanel from "./MainPanel";

export default () => {
    return (
        <div className='bg-dark-background w-full h-full flex flex-row justify-center'>
            <SidePanel />
            <MainPanel />
        </div>
    )
}