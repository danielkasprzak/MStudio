import SideButton from "./SideButton";

export default () => {
    return (
        <div className='bg-white w-auto h-full flex flex-col justify-center text-charcoal'>
            <h1 className="font-cormorant text-xl font-medium p-16">MSTUDIO</h1>

            <SideButton>Panel</SideButton>
            <SideButton>Rezerwacje</SideButton>
            <SideButton>Oferty</SideButton>
        </div>
    )
}