import React from "react";
import { NavLink } from "react-router-dom";

import { GradientHref } from "ui-kit";
import DAOIcon from "ui-kit/images/icons/dao.svg";

import "./styles.scss";

export const SumInfo = () => {
    const currentXP = 77555;

    return (
        <div className="sum-info">
            <NavLink to="/">
                <img src={DAOIcon} width={48} height={48} />
            </NavLink>
            <div className="sum-info__info">
                <div className="sum-info__info__title">
                    <GradientHref>Pengu Egg</GradientHref>
                </div>
                <div className="sum-info__info__description">{currentXP.toLocaleString()} XP</div>
            </div>
        </div>
    );
};
