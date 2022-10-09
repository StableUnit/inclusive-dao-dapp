import React, { useContext, ChangeEvent, useState, useEffect } from "react";
import { TextField } from "@mui/material";

import { useLoader } from "hooks";
import { ButtonGradient, GradientBorder } from "ui-kit";
import { Input } from "components/Input";
import { StateContext } from "reducer/constants";
import { XPIcon } from "ui-kit/images/icons";
import { addErrorNotification, addSuccessNotification } from "utils/notification";
import { ensToAddress, isAddress } from "utils/api";

import "./styles.scss";

export const PageReward = () => {
    const { chainId } = useContext(StateContext);
    const [rewardAddress, setRewardAddress] = useState<string>();
    const [realAddress, setRealAddress] = useState<string>();
    const [rewardValue, setRewardValue] = useState<number>();
    const { isLoading: isRewardLoading, start: startRewardLoader, stop: stopRewardLoader } = useLoader();

    const handleReward = async () => {
        if (chainId) {
            try {
                startRewardLoader();
                const address = await ensToAddress(rewardAddress);
                console.log(address, rewardValue);
                addSuccessNotification("Reward finished successfully");
                stopRewardLoader();
            } catch (e) {
                addErrorNotification("Reward error", e.message);
                stopRewardLoader();
            }
        }
    };

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRewardAddress(event.target.value);
    };

    const handleRewardValueChange = (newValue?: number) => {
        setRewardValue(newValue);
    };

    useEffect(() => {
        if (rewardAddress?.includes(".eth")) {
            ensToAddress(rewardAddress).then((newAddress) => {
                if (newAddress) {
                    setRealAddress(newAddress);
                } else {
                    setRealAddress(undefined);
                }
            });
        } else {
            setRealAddress(undefined);
        }
    }, [rewardAddress]);

    return (
        <GradientBorder borderRadius={24} className="reward-container">
            <div className="reward">
                <div className="reward__title">Reward user</div>

                <TextField
                    id="address"
                    className="reward__address"
                    placeholder="Recipient address"
                    variant="outlined"
                    onChange={handleAddressChange}
                />
                {realAddress && <div className="reward__real-address">Real address: {realAddress}</div>}

                <Input text="Experience points" value={rewardValue} onChange={handleRewardValueChange} Icon={XPIcon} />

                <ButtonGradient
                    className="reward__button"
                    loading={isRewardLoading}
                    onClick={handleReward}
                    disabled={isRewardLoading || !rewardValue || !isAddress(rewardAddress)}
                >
                    {isRewardLoading ? "Reward loading..." : "Reward"}
                </ButtonGradient>
            </div>
        </GradientBorder>
    );
};
