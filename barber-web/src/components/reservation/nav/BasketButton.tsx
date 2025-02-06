import { useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ShoppingBasket } from "lucide-react";
import { basketActions } from "../../../store/basket-slice";

export default () => {
    const selectedItems = useAppSelector((state) => state.cart.items);
    const totalCount = selectedItems.reduce((sum, offer) => sum + offer.quantity, 0);
    const dispatch = useAppDispatch();
    const controls = useAnimation();

    useEffect(() => {
        if (totalCount > 0) {
            controls.start({
                scale: [1, 1.2, 1],
                transition: { duration: 0.3 }
            });
        }
    }, [totalCount, controls]);

    const openPanel = () => {
        dispatch(basketActions.showPanel());
    };

    return (
        <button onClick={openPanel} className="relative md:hidden ml-4 outline-none">
            <ShoppingBasket color="#353535" size={24} strokeWidth={1.25} />
            <motion.div 
                className="select-none absolute -top-1 -right-1 w-5 h-5 bg-charcoal text-white text-xs font-extrabold rounded-full flex items-center justify-center"
                animate={controls}
            >
                {totalCount}
            </motion.div>
        </button>
    );
}