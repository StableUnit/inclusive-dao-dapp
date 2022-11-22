import React from "react";

import { GradientBorder } from "ui-kit";
import { Perk } from "../Perk";

import "./styles.scss";

const MIN_PERKS = 3;

export const LevelDetails = () => {
    const level = 15;
    const xp = 84000;

    let perks = [""];
    if (perks.length < MIN_PERKS) {
        perks = [...perks, ...new Array(MIN_PERKS - perks.length).fill("")];
    }

    return (
        <GradientBorder borderRadius={24}>
            <div className="level-details">
                <div className="level-details__title">Level details and perks</div>
                <div className="level-details__xp">
                    You are level {level} and have accumulated
                    <br />
                    <b>{xp.toLocaleString()}</b> XP.
                </div>
                <div className="level-details__subtitle">Perks</div>
                <div className="level-details__perks">
                    {perks.map((perk, i) => (
                        <Perk key={`${perk}-${i}`} className="level-details__perk" image={perk} />
                    ))}
                </div>
            </div>
        </GradientBorder>
    );
};
