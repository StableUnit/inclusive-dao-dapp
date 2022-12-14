import { useContext, useEffect, useState } from "react";

import { StateContext } from "reducer/constants";
import { toHRNumber } from "utils/bigNumber";
import { BonusFactory } from "utils/api";

export const useLevel = (xp?: number) => {
    const { currentAddress, chainId } = useContext(StateContext);
    const [level, setLevel] = useState<number>();

    const updateData = async () => {
        if (currentAddress && xp !== undefined) {
            const level2 = await BonusFactory.getLevelByXP(xp);
            setLevel(level2);
        } else {
            setLevel(undefined);
        }
    };

    useEffect(() => {
        updateData();
    }, [currentAddress, chainId, xp]);

    return level;
};
