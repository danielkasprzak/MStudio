import { useState } from "react";

import Basket from "./basket/BasketSidePanel";
import Info from "./info/InfoSidePanel";

interface Props {
    isTraditional?: boolean;
}

export default ({ isTraditional } : Props) => {
    const [activeSidePanel, setActiveSidePanel] = useState<number | null>(1);

    return (
        <div className='flex flex-col justify-start py-8 mr-4 sticky top-0 h-screen z-20'>
            <Info 
                isActive={isTraditional ? true : activeSidePanel === 1} 
                onHover={isTraditional ? undefined : () => setActiveSidePanel(1)} 
                activeHeight={isTraditional ? "auto" : "66%"} 
                inactiveHeight={isTraditional ? "auto" : "40%"} 
            />   
            {!isTraditional && <Basket isActive={activeSidePanel === 2} onHover={() => setActiveSidePanel(2)} activeHeight="66%" inactiveHeight="33%" />}
        </div>
    )
}