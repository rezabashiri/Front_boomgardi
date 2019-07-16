import React, { Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import hostService from "./../services/hostService.jsx";
import addressService from "./../services/addressService.jsx";
import { Row, Input, Label } from "reactstrap";

import Button from "reactstrap-button-loader";
import Select from "react-select";

export default class SearchHost extends React.Component {
  constructor(props) {
    super(props);
    this.getOstanList = this.getOstanList.bind(this);
    this.getShahrestanList = this.getShahrestanList.bind(this);
    this.handleHostNameChange = this.handleHostNameChange.bind(this);
    this.state = {
      selectedOstan: null,
      selectedShahr: null,
      hostTypes: [],
      ostanList: [],
      shahrList: [],
      filterParams: {
        typeId: "",
        ostanId: "",
        shahrestanId: "",
        name: ""
      }
    };
  }
  handleHostNameChange(e) {
    let newfilter = this.state.filterParams;
    newfilter.name = e.target.value;
    this.setState({
      filterParams: newfilter
    });
  }
  componentDidMount() {
    this.onResizeLandingPage();
    window.addEventListener("resize", this.onResizeLandingPage, true);

    this.getOstanList();
    //this.getHostType();
  }
  async getHostType() {
    var typeService = new hostService();
    let hostTypes = await typeService.getHostType();
    let newHostType = hostTypes.map(c => {
      return { column: c.name, lable: c.id };
    });
    this.setState({
      hostTypes: newHostType
    });
  }
  handleOstanChange = selectedOstan => {
    let newfilter = this.state.filterParams;
    newfilter.ostanId = selectedOstan.value;
    this.setState({
      filterParams: newfilter,
      selectedOstan: selectedOstan,
      selectedShahr: null
    });
    this.getShahrestanList(selectedOstan.value);
  };
  handleShahrChange = selectedShahr => {
    let newfilter = this.state.filterParams;
    newfilter.shahrestanId = selectedShahr.value;
    this.setState({
      filterParams: newfilter,
      selectedShahr: selectedShahr
    });
  };
  async getOstanList() {
    let addrService = new addressService();
    let ostanList = await addrService.getOstan();
    let newOstan = ostanList.map(c => {
      return { label: c.name, value: c.id };
    });
    //let newOstan = [{ label: "استان را انتخاب کنید" }, ...newOstan];
    this.setState({
      ostanList: newOstan
    });
  }
  async getShahrestanList(codeostan) {
    let addrService = new addressService();
    let shahrestanList = await addrService.getShahrestan(codeostan);
    let newShahrestan = shahrestanList.map(c => {
      return { label: c.name, value: c.id };
    });
    this.setState({
      shahrList: newShahrestan
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeLandingPage, true);
  }

  onResizeLandingPage() {
    var rowOffestHome = document.querySelector(".home-row").offsetLeft;
    document.querySelector(
      ".landing-page .section.root"
    ).style.backgroundPositionX = rowOffestHome - 252 + "px";
  }

  render() {
    console.log("render");
    if (this.props.filter === false) {
      return (
        <Fragment>
          <Row className="home-row">
            <Colxx xxs="12" className="d-block d-md-none">
              <img
                alt="mobile hero"
                className="mobile-hero"
                src="/assets/img/landing-page/home-hero-mobile.png"
              />
            </Colxx>

            <div className="home-text">
              <div className="display-1">
                <IntlMessages id="lp.hero.line-1" />
                <br />
                <br />
                <IntlMessages id="lp.hero.line-2" />
              </div>
            </div>
          </Row>
          <Row className="align-center">
            <Colxx sm={2}>
              <Label>
                <IntlMessages id="forms.state" />
              </Label>
              <Select
                onChange={this.handleOstanChange}
                options={this.state.ostanList}
                value={this.state.selectedOstan}
                placeholder="انتخاب کنید"
              />
            </Colxx>
            <Colxx sm={2}>
              <Label>
                <IntlMessages id="forms.city" />
              </Label>
              <Select
                onChange={this.handleShahrChange}
                options={this.state.shahrList}
                value={this.state.selectedShahr}
                placeholder="انتخاب کنید"
              />
            </Colxx>
            <Colxx sm={2}>
              <Label for="hostName">
                <IntlMessages id="forms.host-name" />
              </Label>
              <Input onChange={this.handleHostNameChange} />
            </Colxx>
            <Colxx sm={2}>
              <Label for="searchButton" />
              <Button
                className="btn btn-outline-semi-light btn-xl"
                onClick={() => {
                  this.props.history.push({
                    pathname: "/hosts",
                    state: { filterParams: this.state.filterParams }
                  });
                }}
              >
                <IntlMessages id="lp.hero.register" />
              </Button>
            </Colxx>
          </Row>
        </Fragment>
      );
    } else {
      console.log(this.props.filter);
      return null;
    }
  }
}
