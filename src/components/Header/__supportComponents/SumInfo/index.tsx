import React from "react";
import { NavLink } from "react-router-dom";

import tokenLogo from "ui-kit/images/currency/suUSD.svg";

import "./styles.scss";

export const SumInfo = () => {
    return (
        <div className="sum-info">
            <NavLink to="/">
                <img src={tokenLogo} width={48} height={48} />
            </NavLink>
        </div>
    );
};
