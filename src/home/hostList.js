import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import List from "./../routes/hosts/host-list";
import scrollToComponent from "react-scroll-to-component";
import SearchHost from "./searchHost";
import HostList from "./../routes/hosts/host-list";

class SearchHostResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("props", this.props);
    return (
      <Fragment>
        <div className="section home">
          <Container>
            <SearchHost {...this.props} />
          </Container>
        </div>
        <div className="section">
          <Container>
            <HostList {...this.props} />
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default SearchHostResult;
