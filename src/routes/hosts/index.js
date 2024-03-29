import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import hostList from "./host-list";
import roomList from "./room-list";
import addHost from "./add-host";
import hostPage from "./hostPage";

const hosts = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/host-list`} />
      <Route path={`${match.url}/host-list`} component={hostList} />
      <Route path={`${match.url}/hostpage`} component={hostPage} />
      <Route path={`${match.url}/room-list`} component={roomList} />
      <Route path={`${match.url}/add-host`} component={addHost} />
      <Redirect to="/error" />
    </Switch>
  </div>
);

export default hosts;
