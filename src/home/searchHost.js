import React, { Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import hostService from "./../services/hostService.jsx";
import addressService from "./../services/addressService.jsx";
import {
  Row,
  Input,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardText
} from "reactstrap";
import Button from "reactstrap-button-loader";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import { RangeTooltip, RangeTooltipCapacity } from "Components/SliderTooltip";

import "rc-slider/assets/index.css";

export default class SearchHost extends React.Component {
  constructor(props) {
    super(props);
    this.getOstanList = this.getOstanList.bind(this);
    this.getShahrestanList = this.getShahrestanList.bind(this);
    this.handleHostNameChange = this.handleHostNameChange.bind(this);
    this.handleAddService = this.handleAddService.bind(this);
    this.state = {
      selectedOstan: null,
      selectedShahr: null,
      hostTypeSelected: [],
      selectedServices: [],
      hostTypes: [],
      ostanList: [],
      shahrList: [],
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
  handleHostNameChange(e) {
    let newfilter = this.state.filterParams;
    newfilter.name = e.target.value;
    this.setState({
      filterParams: newfilter
    });
  }
  componentDidMount() {
    //this.onResizeLandingPage();
    window.addEventListener("resize", this.onResizeLandingPage, true);

    this.getOstanList();
    this.getHostType();
    this.getServices();
  }
  async getHostType() {
    var typeService = new hostService();
    let hostTypes = await typeService.getHostType();
    let newHostType = hostTypes.map(c => {
      return { label: c.name, value: c.id };
    });
    this.setState({
      hostTypes: newHostType
    });
  }
  async getServices() {
    var typeService = new hostService();
    let hostServices = await typeService.getServices("residency");
    let newHostServices = hostServices.map((service, index) => {
      return { label: service.name, value: service.id };
    });
    this.setState({
      hostServices: newHostServices
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
  handleHostTypeChange = selectedHostType => {
    let newfilter = this.state.filterParams;
    newfilter.typeId = selectedHostType;
    this.setState({
      filterParams: newfilter
    });
  };
  handleAddService = selectedService => {
    this.setState({ selectedServices: selectedService });

    let newfilter = this.state.filterParams;
    newfilter.selectedServices = selectedService;
    this.setState({
      filterParams: newfilter
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
    switch (this.props.viewType) {
      case "homeSearch":
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
        break;
      case "sideBarFilter":
        return (
          <Row className="mr-0">
            <Colxx sm={12} className="mb-3">
              <Label>
                <IntlMessages id="forms.host-type" />
              </Label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                isMulti
                name="form-field-name"
                value={this.state.selectedHostType}
                onChange={this.handleHostTypeChange}
                options={this.state.hostTypes}
                placeholder="انتخاب کنید"
              />
            </Colxx>
            <Colxx sm={12} className="mb-3">
              <Label className="av-label" for="hostServices">
                <IntlMessages id="forms.host-services" />
              </Label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                isMulti
                name="form-field-name"
                value={this.state.selectedServices}
                onChange={this.handleAddService}
                options={this.state.hostServices}
                placeholder="انتخاب کنید"
              />
            </Colxx>
            <Colxx sm={12} className="mb-3">
              <Label>
                <IntlMessages id="layouts.filter.ostan" />
              </Label>
              <Select
                onChange={this.handleOstanChange}
                options={this.state.ostanList}
                value={this.state.selectedOstan}
                placeholder="انتخاب کنید"
              />
            </Colxx>
            <Colxx sm={12} className="mb-3">
              <Label>
                <IntlMessages id="layouts.filter.shahr" />
              </Label>
              <Select
                onChange={this.handleShahrChange}
                options={this.state.shahrList}
                value={this.state.selectedShahr}
                placeholder="انتخاب کنید"
              />
            </Colxx>
            <Colxx sm={12} className="mb-3">
              <Label for="hostName">
                <IntlMessages id="forms.host-name" />
              </Label>
              <Input onChange={this.handleHostNameChange} />
            </Colxx>
            <Colxx sm={12} className="mb-3">
              <label>
                <IntlMessages id="layouts.price" />
              </label>
              <RangeTooltip
                min={10000}
                max={100000}
                className="mb-5"
                defaultValue={[15000, 50000]}
                allowCross={false}
                pushable={1000}
              />
            </Colxx>
            <Colxx sm={12} className="mb-3">
              <label>
                <IntlMessages id="forms.room-capacity" />
              </label>
              <RangeTooltipCapacity
                min={1}
                max={15}
                className="mb-5"
                defaultValue={[1, 10]}
                allowCross={false}
                pushable={1}
              />
            </Colxx>
            <Colxx sm={12} className="mb-3 mt-1">
              <Button
                onClick={() => {
              
                  var params = this.state.filterParams;
                  this.props.onHandleFilterParams(params);
                  /*this.props.history.push({
                    pathname: "/hosts",
                    state: { filterParams: this.state.filterParams }
                  });*/
                }}
              >
                <IntlMessages id="lp.hero.register" />
              </Button>
            </Colxx>
          </Row>
        );
        break;
      default:
        return <div>no viewType</div>;
        break;
    }
  }
}
