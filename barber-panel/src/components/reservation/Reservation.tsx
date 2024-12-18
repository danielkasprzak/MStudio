import Basket from "./BasketSidePanel"
import Info from "./InfoSidePanel"
import NavBar from "./NavBar"
import Offers from "./Offers"
import Panel from "./Panel"
import { useState } from "react"

export default () => {
    const [activeSidePanel, setActiveSidePanel] = useState<number | null>(1);

    return (
        <div className='bg-dark-background w-full h-full flex flex-row justify-center'>
            <Panel panelType='left'>
                <Info isActive={activeSidePanel === 1} onHover={() => setActiveSidePanel(1)} activeHeight="66%" inactiveHeight="40%" />
                <Basket isActive={activeSidePanel === 2} onHover={() => setActiveSidePanel(2)} activeHeight="66%" inactiveHeight="33%" />
            </Panel>
            <Panel panelType='right'>
                <NavBar />
                <Offers />
            </Panel>
        </div>
    )
}