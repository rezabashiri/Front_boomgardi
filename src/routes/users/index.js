import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import dataList from "./data-list";

const users = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/data-list`} />
      <Route path={`${match.url}/data-list`} component={dataList} />
      <Redirect to="/error" />
    </Switch>
  </div>
);

export default users;
