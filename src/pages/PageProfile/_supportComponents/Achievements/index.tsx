import React from "react";

import { GradientBorder } from "ui-kit";
import { Achievement } from "../Achievement";

import "./styles.scss";

const MIN_ACHIEVEMENTS = 12;

export const Achievements = () => {
    let achievements = [
        {
            image: "/images/Penguin1.png",
            text: "Real crypto penguin!",
        },
        {
            image: "/images/Medal.png",
            text: "Medal of honor",
        },
    ];
    if (achievements.length < MIN_ACHIEVEMENTS) {
        achievements = [...achievements, ...new Array(MIN_ACHIEVEMENTS - achievements.length).fill("")];
    }

    return (
        <GradientBorder borderRadius={24}>
            <div className="achievements">
                <div className="achievements__title">Achievements</div>
                <div className="achievements__content">
                    {achievements.map((achievement, i) => (
                        <Achievement
                            key={`${achievement}-${i}`}
                            className="achievements__achievement"
                            image={achievement.image}
                            text={achievement.text}
                        />
                    ))}
                </div>
            </div>
        </GradientBorder>
    );
};
