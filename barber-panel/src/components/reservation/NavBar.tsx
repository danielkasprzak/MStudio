import NavButton from "./NavButton"

export default () => {
    return (
        <div className='w-[46rem] h-auto py-4 flex flex-row items-center justify-end'>
            <NavButton>Panel administratora</NavButton>
            <NavButton>Moje rezerwacje</NavButton>
            <NavButton>Rezerwacja</NavButton>
        </div>
    )
}