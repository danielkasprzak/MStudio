import SmallButton from "./SmallButton";
import Title from "./Title";

export default () => {
    return (
        <div className='relative bg-white w-auto h-screen flex flex-col text-charcoal'>
            <Title padding='16'>MSTUDIO</Title>

            <SmallButton>Panel</SmallButton>
            <SmallButton>Rezerwacje</SmallButton>
            <SmallButton>Oferty</SmallButton>
        </div>
    )
}