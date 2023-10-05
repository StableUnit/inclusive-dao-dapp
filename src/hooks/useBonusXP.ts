import { useContext, useEffect, useState } from "react";

import { StateContext } from "reducer/constants";
import { BonusFactory } from "utils/api";

export const useBonusXP = () => {
    const { currentAddress } = useContext(StateContext);
    const [xp, setXP] = useState(0);

    const updateData = async () => {
        if (currentAddress) {
            setXP((await BonusFactory.getXP()) ?? 0);
        } else {
            setXP(0);
        }
    };

    useEffect(() => {
        updateData();
    }, [currentAddress]);

    return xp;
};
