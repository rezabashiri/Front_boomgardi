import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import HostPage from "./../routes/hosts/hostPage";
import { Colxx } from "Components/CustomBootstrap";
import hostService from "./../services/hostService.jsx";

class HostInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostInfo: null
    };
  }
  async componentDidMount() {
    var service = new hostService();
    let result = await service.getHosts({
      guid: this.props.match.params.hostId
    });
    await this.setState({ hostInfo: result[0] });
  }

  render() {
    return (
      <Fragment>
        <div className="section host">
          <Container>
            {this.state.hostInfo && (
              <HostPage
                hostInfo={this.state.hostInfo}
                {...this.props}
                role="user"
              />
            )}
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default HostInfoPage;
