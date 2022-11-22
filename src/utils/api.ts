import Web3 from "web3";
import { ethers } from "ethers";

import { Contract } from "web3-eth-contract";
import BONUS from "submodule-artifacts/goerli/Bonus.json";

type ContractsType = "BonusContract";

export const contracts: Record<ContractsType, Contract | undefined> = {
    BonusContract: undefined,
};

export const initAllContracts = (web3: Web3) => {
    setBonusContract(new web3.eth.Contract(BONUS.abi as any, BONUS.address));
};

export const setBonusContract = (newContract: Contract) => {
    contracts.BonusContract = newContract;
};

let currentAddress: string;
export const setUtilsCurrentAddress = (newAddress: string) => {
    currentAddress = newAddress;
};

let web3: Web3;
export const setUtilsWeb3 = (newWeb3: Web3) => {
    web3 = newWeb3;
};

export const BonusFactory = {
    getLevel: async () => {
        if (currentAddress && contracts.BonusContract) {
            return contracts.BonusContract.methods.getLevel(currentAddress).call();
        }
        return undefined;
    },
    getXP: async () => {
        if (currentAddress && contracts.BonusContract) {
            const userInfo = await contracts.BonusContract.methods.userInfo(currentAddress).call();
            return +userInfo.xp;
        }
        return undefined;
    },
    getLevelBounds: async (level: number) => {
        if (level && contracts.BonusContract) {
            const lowerBound = await contracts.BonusContract.methods.levelMap(level - 1).call();
            const upperBound = await contracts.BonusContract.methods.levelMap(level).call();
            return [lowerBound, upperBound] as number[];
        }
        return undefined;
    },
};

export const isAddress = (address?: string) => address?.startsWith("0x") || address?.includes(".eth");

export const ensToAddress = async (ens?: string) =>
    ens?.includes(".eth") ? ethers.providers.getDefaultProvider().resolveName(ens) : ens;
