import { useState } from "react";
import Basket from "./basket/BasketSidePanel"
import Info from "./info/InfoSidePanel"

export default () => {
    const [activeSidePanel, setActiveSidePanel] = useState<number | null>(1);

    return (
        <div className='flex flex-col justify-start py-8 mr-4 sticky top-0 h-screen'>
            <Info isActive={activeSidePanel === 1} onHover={() => setActiveSidePanel(1)} activeHeight="66%" inactiveHeight="40%" />
            <Basket isActive={activeSidePanel === 2} onHover={() => setActiveSidePanel(2)} activeHeight="66%" inactiveHeight="33%" />
        </div>
    )
}