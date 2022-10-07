import Web3 from "web3";
import BigNumber from "bignumber.js";

import CONTRACT_ERC20 from "contracts/ERC20.json";

let currentAddress: string;
export const setUtilsCurrentAddress = (newAddress: string) => {
    currentAddress = newAddress;
};

let web3: Web3;
export const setUtilsWeb3 = (newWeb3: Web3) => {
    web3 = newWeb3;
};

export const CommonFactory = {
    createCurrencyContract: (address: string) => {
        const newWeb3 = web3 ?? new Web3(Web3.givenProvider);
        if (newWeb3 && address) {
            return new newWeb3.eth.Contract(CONTRACT_ERC20 as any, address);
        }
        return undefined;
    },
    balance: async (tokenAddress?: string) => {
        if (!web3 || !tokenAddress || !currentAddress) {
            return new BigNumber(0);
        }

        const tokenContract = new web3.eth.Contract(CONTRACT_ERC20 as any, tokenAddress);
        return new BigNumber(await tokenContract.methods.balanceOf(currentAddress).call());
    },
};
