import Web3 from "web3";
import { Web3Auth } from "@web3auth/web3auth";

// eslint-disable-next-line no-shadow
export enum Actions {
    SetCurrentAddress = "SET_CURRENT_ADDRESS",
    SetChainId = "SET_CHAIN",
    SetIsNetworkModalVisible = "SET_IS_NETWORK_MODAL_VISIBLE",
    SetWeb3Auth = "SET_WEB3_AUTH",
    SetWeb3 = "SET_WEB3",
}

export type ActionType =
    | {
          type: Actions.SetCurrentAddress;
          payload: string | undefined;
      }
    | {
          type: Actions.SetIsNetworkModalVisible;
          payload: boolean;
      }
    | {
          type: Actions.SetWeb3;
          payload: Web3 | undefined;
      }
    | {
          type: Actions.SetWeb3Auth;
          payload: Web3Auth | null;
      }
    | {
          type: Actions.SetChainId;
          payload: number | undefined;
      };

export interface ReducerState {
    currentAddress?: string;
    chainId?: number;
    isNetworkModalVisible: boolean;
    web3auth: Web3Auth | null;
    web3?: Web3;
}

const reducer: (state: ReducerState, action: ActionType) => ReducerState = (state, action) => {
    switch (action.type) {
        case Actions.SetCurrentAddress:
            return {
                ...state,
                currentAddress: action.payload,
            };
        case Actions.SetChainId:
            return {
                ...state,
                chainId: action.payload,
            };
        case Actions.SetIsNetworkModalVisible: {
            return {
                ...state,
                isNetworkModalVisible: action.payload,
            };
        }
        case Actions.SetWeb3Auth: {
            return {
                ...state,
                web3auth: action.payload,
            };
        }
        case Actions.SetWeb3: {
            return {
                ...state,
                web3: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
