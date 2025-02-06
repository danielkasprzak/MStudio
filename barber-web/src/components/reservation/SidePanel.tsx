import { useState } from "react";

import Basket from "./basket/BasketSidePanel";
import Info from "./info/InfoSidePanel";

interface Props {
    isTraditional?: boolean;
    isMobile?: boolean;
}

export default ({ isTraditional, isMobile } : Props) => {
    const [activeSidePanel, setActiveSidePanel] = useState<number | null>(1);

    return (
        <div className='h-auto md:h-screen w-full relative px-8 md:w-auto flex flex-col justify-start py-8 md:px-0 md:sticky md:top-0 md:mr-4 z-20'>
            <Info 
                isActive={isTraditional ? true : activeSidePanel === 1} 
                onHover={isTraditional ? undefined : () => setActiveSidePanel(1)} 
                activeHeight={isTraditional ? "auto" : "66%"} 
                inactiveHeight={isTraditional ? "auto" : "40%"}
                isMobile={isMobile}
            />   
            {(!isTraditional || (isTraditional && isMobile)) && <Basket isActive={activeSidePanel === 2} onHover={() => setActiveSidePanel(2)} activeHeight="66%" inactiveHeight="33%" />}
        </div>
    )
}