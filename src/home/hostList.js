import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import scrollToComponent from "react-scroll-to-component";
import SearchHost from "./searchHost";
import HostList from "./../routes/hosts/host-list";
import { Colxx } from "Components/CustomBootstrap";
import Query from "query-string";

class SearchHostResult extends Component {
  constructor(props) {
    super(props);
    //this.handleFilterParams= this.handleFilterParams.bind(this);
    this.state = {
      filterParams: {
        hostTypeSelected: [],
        selectedServices: [],
        typeIds: [],
        ostanId: "",
        shahrestanId: "",
        name: ""
      }
    };
  }
  componentDidMount() {
    if (this.props.location.search) {
      this.setState({
        filterParams: Query.parse(this.props.location.search)
      });
    } else if (this.props.filterParams) {
      this.setState({
        filterParams: this.props.filterParams
      });
    }
  }
  /*handleFilterParams = async filterParams => {
    await this.setState({
      filterParams: filterParams
    });
  };*/
  render() {
    return (
      <Fragment>
        <div className="section host">
          <Row className="ml-4">
            <Colxx lg="4" xl="2">
              <SearchHost viewType="sideBarFilter" {...this.props} />
            </Colxx>
            <Colxx lg="20" xl="10">
              <HostList
                {...this.props}
                filterParams={this.state.filterParams}
                role="user"
              />
            </Colxx>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default SearchHostResult;
