import SideButton from "./SideButton";
import Title from "./Title";

export default () => {
    return (
        <div className='relative bg-white w-auto h-screen flex flex-col text-charcoal'>
            <Title padding='16'>MSTUDIO</Title>

            <SideButton>Panel</SideButton>
            <SideButton>Rezerwacje</SideButton>
            <SideButton>Oferty</SideButton>
        </div>
    )
}