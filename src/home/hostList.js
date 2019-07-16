import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import scrollToComponent from "react-scroll-to-component";
import SearchHost from "./searchHost";
import HostList from "./../routes/hosts/host-list";
import { Colxx } from "Components/CustomBootstrap";

class SearchHostResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="section host">
          <Container>
            <Row>
              <Colxx lg="4" xl="2">
                <SearchHost filter={false} {...this.props} />
              </Colxx>
              <Colxx lg="20" xl="10">
                <HostList {...this.props} />
              </Colxx>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default SearchHostResult;
