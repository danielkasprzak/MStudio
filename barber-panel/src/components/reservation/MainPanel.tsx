import NavBar from "./NavBar"
import Offers from "./Offers"

export default () => {
    return (
        <div className='flex flex-col justify-start py-8 ml-4'>
            <NavBar />
            <Offers />
        </div>
    )
}