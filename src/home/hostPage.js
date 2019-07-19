import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import HostPage from "./../routes/hosts/hostPage";
import { Colxx } from "Components/CustomBootstrap";

class HostInfoPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="section host">
          <Container>
            <HostPage
              hostInfo={this.props.location.state.hostInfo}
              {...this.props}
              role="user"
            />
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default HostInfoPage;
