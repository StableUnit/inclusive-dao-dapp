import React from "react";
import { NavLink } from "react-router-dom";

import DAOIcon from "ui-kit/images/icons/dao.svg";

import "./styles.scss";

export const SumInfo = () => {
    return (
        <div className="sum-info">
            <NavLink to="/">
                <img src={DAOIcon} width={48} height={48} />
            </NavLink>
        </div>
    );
};
