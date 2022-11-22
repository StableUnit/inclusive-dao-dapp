import { useContext, useEffect, useState } from "react";

import { StateContext } from "reducer/constants";
import { BonusFactory } from "utils/api";

export const useBonusLevelBounds = (level: number) => {
    const { currentAddress } = useContext(StateContext);
    const [bounds, setBounds] = useState([0, 0]);

    const updateData = async () => {
        if (currentAddress) {
            setBounds((await BonusFactory.getLevelBounds(level)) ?? [0, 0]);
        } else {
            setBounds([0, 0]);
        }
    };

    useEffect(() => {
        updateData();
    }, [level]);

    return bounds;
};
