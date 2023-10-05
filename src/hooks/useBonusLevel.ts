import { useContext, useEffect, useState } from "react";

import { StateContext } from "reducer/constants";
import { toHRNumber } from "utils/bigNumber";
import { BonusFactory } from "utils/api";

export const useBonusLevel = () => {
    const { currentAddress } = useContext(StateContext);
    const [level, setLevel] = useState<number>();

    const updateData = async () => {
        if (currentAddress) {
            setLevel(await BonusFactory.getLevel());
        } else {
            setLevel(undefined);
        }
    };

    useEffect(() => {
        updateData();
    }, [currentAddress]);

    return level;
};
