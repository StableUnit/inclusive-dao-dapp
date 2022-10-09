import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import cn from "classnames";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";

import { Actions } from "reducer";
import { DispatchContext, StateContext } from "reducer/constants";
import { setUtilsCurrentAddress, setUtilsWeb3 } from "utils/api";
import {
    DEFAULT_NETWORK,
    getIdByNetworkName,
    getNetworkNameById,
    NETWORK,
    networkInfo,
    NetworkType,
    supportedNetworks,
} from "utils/network";

import { Routes } from "../Routes";
import { Header } from "../Header";
import { NetworkModal } from "../NetworkModal";

import "./styles.scss";

const getRPC = () => {
    const res = {} as Record<number, string>;

    Object.keys(NETWORK).forEach((key) => {
        if (key !== NETWORK.unsupported) {
            const networkName = NETWORK[key as NetworkType];
            res[getIdByNetworkName(networkName)] = networkInfo[networkName].rpcUrls[0];
        }
    });

    return res;
};

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: getRPC(),
            chainId: [getIdByNetworkName(DEFAULT_NETWORK)],
            network: DEFAULT_NETWORK,
            qrcode: true,
            qrcodeModalOptions: {
                mobileLinks: ["metamask", "trust"],
            },
        },
    },
    binancechainwallet: {
        package: true,
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "Inclusive App",
            infuraId: "20518e992a3143bd86f2367198e7856a",
            rpc: getRPC(),
            chainId: [getIdByNetworkName(DEFAULT_NETWORK)],
            darkMode: true,
        },
    },
};
const web3Modal = new Web3Modal({
    network: DEFAULT_NETWORK,
    cacheProvider: true,
    providerOptions,
    theme: {
        background: "#313131",
        main: "rgb(255, 255, 255)",
        secondary: "rgb(136, 136, 136)",
        border: "none",
        hover: "rgba(32, 32, 29, 0.8)",
    },
});

const clientId = "BJdx67jqg-GH8fGTkhWy0LYbsszrAxWGiF2IGnCbg7smdhP0K11EbFHqV26SBZctnemMJvXxPhAjEoOBdWYQZxA";

export const App = React.memo(() => {
    const [web3, setWeb3] = useState(new Web3(Web3.givenProvider));
    const { chainId, web3auth } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const onDisconnect = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await web3auth.logout();
        // setProvider(null);
        dispatch({ type: Actions.SetCurrentAddress, payload: undefined });
        dispatch({ type: Actions.SetChainId, payload: undefined });
        await web3Modal.clearCachedProvider();
    };
    const subscribeProvider = async (newProvider: any) => {
        if (!newProvider.on) {
            return;
        }
        newProvider.on("close", () => {
            onDisconnect();
        });
        newProvider.on("accountsChanged", async (accounts: string[]) => {
            dispatch({ type: Actions.SetCurrentAddress, payload: accounts[0] });
            setUtilsCurrentAddress(accounts[0]);
        });
        newProvider.on("chainChanged", async (hexChainId: string) => {
            const newChainId = Web3.utils.hexToNumber(hexChainId);
            dispatch({ type: Actions.SetChainId, payload: newChainId });
        });
    };
    const onConnect = async () => {
        const newWeb3auth = new Web3Auth({
            clientId,
            chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: "0x89",
                rpcTarget: "https://polygon-rpc.com/",
            },
        });

        dispatch({ type: Actions.SetWeb3Auth, payload: newWeb3auth });

        await newWeb3auth.initModal();
        // if (newWeb3auth.provider) {
        //     setProvider(newWeb3auth.provider);
        // }
        const web3authProvider = await newWeb3auth.connect();
        // setProvider(web3authProvider);
        await subscribeProvider(web3authProvider);

        const newWeb3: Web3 = new Web3(web3authProvider as any);
        setUtilsWeb3(newWeb3);
        setWeb3(newWeb3);
        dispatch({ type: Actions.SetWeb3, payload: newWeb3 });

        const accounts = await newWeb3.eth.getAccounts();
        dispatch({ type: Actions.SetCurrentAddress, payload: accounts[0] });
        setUtilsCurrentAddress(accounts[0]);

        const newChainId = await newWeb3.eth.getChainId();
        dispatch({ type: Actions.SetChainId, payload: newChainId });
    };

    useEffect(() => {
        onConnect();
    }, []);

    const isNotSupportedChain = chainId && !supportedNetworks.includes(getNetworkNameById(chainId) as NetworkType);

    return (
        <div className="App">
            <Header onConnect={onConnect} onDisconnect={onDisconnect} />
            <div className="App__content">
                <div className={cn("App__scroller", { "App__scroller--disabled": isNotSupportedChain })}>
                    <Routes />
                </div>
            </div>
            <NetworkModal />
        </div>
    );
});
