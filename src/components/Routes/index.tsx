import React from "react";
import { Switch, Route } from "react-router-dom";
import Web3 from "web3";

import { PageReward } from "pages/PageReward";

interface Props {
    onConnect: () => void;
    web3: Web3;
}

export const Routes = () => (
    <Switch>
        {/* @ts-ignore */}
        <Route exact path="/reward">
            <PageReward />
        </Route>
    </Switch>
);
