import SmallButton from "./SmallButton";
import Title from "./Title";

export default () => {
    return (
        <div className='sticky top-0 h-screen bg-white w-auto flex flex-col text-charcoal'>
            <Title padding='16'>MSTUDIO</Title>

            <SmallButton>Panel</SmallButton>
            <SmallButton>Rezerwacje</SmallButton>
            <SmallButton>Oferta</SmallButton>
        </div>
    )
}