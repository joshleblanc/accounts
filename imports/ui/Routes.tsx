import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Login} from "/imports/ui/pages/Login";
import {Register} from "/imports/ui/pages/Register";
import {Authorize} from "/imports/ui/pages/Authorize";
import {Applications} from "./pages/Applications";
import {Application} from "./pages/Application";
import {Profile} from "./pages/Profile";

export const Routes = () => {
  return(
    <Switch>
      <Route path={"/profile"}>
        <Profile />
      </Route>
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route path={"/register"}>
        <Register />
      </Route>
      <Route path={"/oauth/authorize"}>
        <Authorize />
      </Route>
      <Route exact path={"/applications"}>
        <Applications />
      </Route>
      <Route path={"/applications/:id"} exact>
        <Application />
      </Route>
    </Switch>
  )
}