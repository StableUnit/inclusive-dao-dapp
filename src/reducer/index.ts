import Web3 from "web3";

// eslint-disable-next-line no-shadow
export enum Actions {
    SetCurrentAddress = "SET_CURRENT_ADDRESS",
    SetChainId = "SET_CHAIN",
    SetIsNetworkModalVisible = "SET_IS_NETWORK_MODAL_VISIBLE",
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
          type: Actions.SetChainId;
          payload: number | undefined;
      };

export interface ReducerState {
    currentAddress?: string;
    chainId?: number;
    isNetworkModalVisible: boolean;
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
