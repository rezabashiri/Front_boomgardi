import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import list from "./host-list";

const hosts = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={list} />
      <Redirect to="/error" />
    </Switch>
  </div>
);

export default hosts;
