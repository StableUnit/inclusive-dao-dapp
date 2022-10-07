import React from "react";

import { SuUsdIcon, OneInchIcon, WBTCIcon, UsdtIcon, SHIBIcon, EthIcon } from "ui-kit/images/currency";
import { TokenMetadata } from "./types";

export type SupportedTokensType = "WETH" | "WBTC" | "USDT" | "1INCH" | "SHIB" | "SuUSD";

export const BORROW_CURRENCY = "SuUSD" as SupportedTokensType;

export const getTokenIcon = (tokenName: SupportedTokensType) => {
    switch (tokenName) {
        case "WETH":
            return <EthIcon />;
        case "WBTC":
            return <WBTCIcon />;
        case "USDT":
            return <UsdtIcon />;
        case "1INCH":
            return <OneInchIcon />;
        case "SHIB":
            return <SHIBIcon />;
        case "SuUSD":
            return <SuUsdIcon />;
        default:
            return null;
    }
};

export const addToMetamask = (tokenMetadata: TokenMetadata) =>
    window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
            type: "ERC20",
            options: tokenMetadata,
        },
    });
