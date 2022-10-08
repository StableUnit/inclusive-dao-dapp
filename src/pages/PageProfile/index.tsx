import React, { useContext, useState } from "react";

import { useLoader } from "hooks";
import { ButtonGradient, GradientBorder, GradientHref } from "ui-kit";
import { Input } from "components/Input";
import { StateContext } from "reducer/constants";
import { LvlIcon } from "ui-kit/images/icons";
import { addErrorNotification, addSuccessNotification } from "utils/notification";
import { getShortAddress } from "utils/network";

import "./styles.scss";

interface Props {}

export const PageProfile = () => {
    const { chainId, currentAddress } = useContext(StateContext);
    const [contributeAddress, setContributeAddress] = useState<string>();
    const [contributeValue, setContributeValue] = useState<number>();
    const { isLoading: isContributeLoading, start: startContributeLoader, stop: stopContributeLoader } = useLoader();

    const handleContribute = async () => {
        if (chainId) {
            try {
                startContributeLoader();
                console.log(contributeAddress, contributeValue);
                addSuccessNotification("Contribute finished successfully");
                stopContributeLoader();
            } catch (e) {
                addErrorNotification("Contribute error", e.message);
                stopContributeLoader();
            }
        }
    };

    return (
        <GradientBorder borderRadius={24} className="contribute-container">
            <div className="contribute">
                <div className="contribute__title">DAO Profile</div>

                {currentAddress && (
                    <GradientHref className="contribute__address">{getShortAddress(currentAddress)}</GradientHref>
                )}

                <Input text="Level in the DAO" value={0} Icon={LvlIcon} />

                <ButtonGradient
                    className="contribute__button"
                    loading={isContributeLoading}
                    onClick={handleContribute}
                    disabled={isContributeLoading}
                >
                    {isContributeLoading ? "Contribute loading..." : "Contribute"}
                </ButtonGradient>
            </div>
        </GradientBorder>
    );
};
