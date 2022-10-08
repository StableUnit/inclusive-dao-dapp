import React, { useContext, useState } from "react";

import { useLoader } from "hooks";
import { ButtonGradient, GradientBorder, GradientHref, ProgressBar } from "ui-kit";
import { Input } from "components/Input";
import { StateContext } from "reducer/constants";
import { LvlIcon } from "ui-kit/images/icons";
import { addErrorNotification, addSuccessNotification } from "utils/notification";
import { getShortAddress } from "utils/network";

import "./styles.scss";

interface Props {}

export const PageProfile = () => {
    const { chainId, currentAddress } = useContext(StateContext);
    const { isLoading: isContributeLoading, start: startContributeLoader, stop: stopContributeLoader } = useLoader();

    const currentXP = 77555;
    const lvlStartXP = 68637;
    const lvlEndXP = 81961;
    const percent = ((currentXP - lvlStartXP) / (lvlEndXP - lvlStartXP)) * 100;

    const handleContribute = async () => {
        if (chainId) {
            try {
                startContributeLoader();
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

                <Input text="Level in the DAO" value={19} Icon={LvlIcon} />

                <div className="contribute__progress-bar__title">Experience points</div>
                <ProgressBar className="contribute__progress-bar" percent={percent} />
                <div className="contribute__progress-bar__description">
                    {lvlEndXP - currentXP} XP left for leveling up
                </div>

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
