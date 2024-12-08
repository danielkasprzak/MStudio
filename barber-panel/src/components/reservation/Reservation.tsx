import Basket from "./Basket"
import Info from "./Info"
import NavBar from "./NavBar"
import Offer from "./Offer"
import Panel from "./Panel"

export default () => {
    return (
        <>
            <Panel panelType='left'>
                <Info />
                <Basket />
            </Panel>
            <Panel panelType='right'>
                <NavBar />
                <Offer />
            </Panel>
        </>
    )
}