import React from "react";
import cn from "classnames";

import "./styles.scss";

interface Props {
    image?: string;
    text?: string;
    className?: string;
}

export const Achievement = ({ image, text, className }: Props) =>
    image ? (
        <div className={cn("achievement", className)}>
            <div className="achievement-inner">
                <div className="achievement-front">
                    <img src={image} className="achievement__image" alt="Achievement" />
                </div>
                <div className="achievement-back">
                    <p>{text}</p>
                </div>
            </div>
        </div>
    ) : (
        <div className={cn("achievement--empty", className)} />
    );
