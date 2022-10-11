import React from "react";
import cn from "classnames";

import "./styles.scss";

interface Props {
    image?: string;
    className?: string;
}

export const Perk = ({ image, className }: Props) => (
    <div className={cn("perk", className)}>{image && <img src={image} className="perk__image" />}</div>
);
