import React from "react";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { Whisper, Tooltip as TooltipRs } from "rsuite";
import { TypeAttributes } from "rsuite/esm/@types/common";

type Props = {
    id: string;
    children: React.ReactElement;
    onClick?: () => void;
    placement?: TypeAttributes.Placement;
};

export const Tooltip = ({ children, id, onClick, placement = "top" }: Props) => {
    return (
        <Whisper
            onClick={onClick}
            placement={placement}
            controlId={id}
            trigger="hover"
            speaker={<TooltipRs>{children}</TooltipRs>}
        >
            <InfoOutlineIcon />
        </Whisper>
    );
};
