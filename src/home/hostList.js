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
    //this.handleFilterParams= this.handleFilterParams.bind(this);
    this.state = {
      filterParams: {
        hostTypeSelected: [],
        selectedServices: [],
        typeId: [],
        ostanId: "",
        shahrestanId: "",
        name: ""
      }
    };
  }
  componentWillMount() {
    console.log("will mount");
    if (this.props.location.state) 
    {
      console.log("this is hostList will mount1");
      this.setState({
        filterParams: this.props.location.state.filterParams
      });
    }
    else if(this.props.filterParams)
    {
      console.log("this is hostList will mount2",this.props.filterParams);
      this.setState({
        filterParams: this.props.filterParams
      });
    }
  }
    handleFilterParams= async filterParams=> {
    console.log("filters changed", filterParams);
    await this.setState({
      filterParams: filterParams
    });
  };
  render() {
    console.log("rendering",this.state.filterParams);
    return (
      <Fragment>
        <div className="section host">
          <Row className="ml-4">
            <Colxx lg="4" xl="2">
              <SearchHost
                viewType="sideBarFilter"
                onHandleFilterParams={this.handleFilterParams}
                {...this.props}
              />
            </Colxx>
            <Colxx lg="20" xl="10">
              <HostList
                {...this.props}
                filterParams={this.state.filterParams}
              />
            </Colxx>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default SearchHostResult;
