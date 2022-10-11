import React from "react";

import { GovernanceChart } from "components/GovernanceChart";
import { ProfileInfo } from "./_supportComponents/ProfileInfo";
import { Achievements } from "./_supportComponents/Achievements";
import { LevelDetails } from "./_supportComponents/LevelDetails";

import "./styles.scss";

export const PageProfile = () => {
    return (
        <div className="profile-page">
            <div className="profile-page__content">
                <Achievements />
                <ProfileInfo />
                <LevelDetails />
            </div>
            <GovernanceChart />
        </div>
    );
};
