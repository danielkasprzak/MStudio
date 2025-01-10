import SmallButton from "./SmallButton";
import Title from "./Title";

export default () => {
    return (
        <div className='sticky top-0 h-screen bg-white w-auto flex flex-col justify-between text-charcoal'>
            <div className="flex flex-col">
                <Title padding='16'>MSTUDIO</Title>

                <SmallButton>Panel</SmallButton>
                <SmallButton>Rezerwacje</SmallButton>
                <SmallButton>Oferta</SmallButton>
            </div>
            <div className="flex flex-col pb-8">
                <SmallButton>Powrót</SmallButton>
                <SmallButton>Wyloguj się</SmallButton>
            </div>
        </div>
    )
}