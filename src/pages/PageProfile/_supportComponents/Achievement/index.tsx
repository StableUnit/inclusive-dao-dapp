import React from "react";
import cn from "classnames";

import "./styles.scss";

interface Props {
    image?: string;
    className?: string;
}

export const Achievement = ({ image, className }: Props) => (
    <div className={cn("achievement", className)}>{image && <img src={image} className="achievement__image" />}</div>
);
