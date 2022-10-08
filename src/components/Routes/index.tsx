import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { PageReward } from "pages/PageReward";
import { PageProfile } from "pages/PageProfile";

export const Routes = () => (
    <Switch>
        {/* @ts-ignore */}
        <Route exact path="/reward">
            <PageReward />
        </Route>

        {/* @ts-ignore */}
        <Route exact path="/profile">
            <PageProfile />
        </Route>

        {/* @ts-ignore */}
        <Route exact path="/">
            <Redirect to="/profile" />
        </Route>
    </Switch>
);
