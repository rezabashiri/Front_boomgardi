import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import hostService from "../../services/hostService.jsx";
import addressService from "../../services/addressService.jsx";
import QueryString from "../../services/queryString.jsx";
//import hostModel from "../../models/hostModel.jsx";
import HostActions from "./hostActions";
import { serverConfig } from "../../constants/defaultValues.js";
import {
  Row,
  Card,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  Collapse,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  ButtonDropdown,
  Input,
  CardBody,
  CardSubtitle,
  CardImg,
  Label,
  CardText,
  Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
//import Select from "react-select";
//import CustomSelectInput from "Components/CustomSelectInput";
import classnames from "classnames";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";

import Pagination from "Components/List/Pagination";
import mouseTrap from "react-mousetrap";

function collect(props) {
  return { data: props.data };
}

class HostList extends Component {
  constructor(props) {
    super(props);
    this.toggleDisplayOptions = this.toggleDisplayOptions.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.getHost = this.getHost.bind(this);
    //this.getHostOstan = this.getHostOstan.bind(this);

    this.state = {
      displayMode: "list",
      pageSizes: [10, 20, 30, 50, 100],
      selectedPageSize: 10,
      hostTypes: [],
      hostTypesFilterOption: { column: "", label: "" },
      ostanList: [],
      ostanFilterOptions: {},
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      displayOptionsIsOpen: false,
      isLoading: false,
      hosts: [],
      filterParams: {
        residencyTypeId: "",
        ostanId: "",
        name: ""
      }
    };
  }

  componentWillMount() {
    this.props.bindShortcut(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.props.bindShortcut(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }

  toggleDisplayOptions() {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  }
  async filterByHostType(lable) {
    let newfilter = this.state.filterParams;
    newfilter.residencyTypeId = lable;
    await this.setState({
      filterParams: newfilter
    });
    //let queryService = new QueryString();
    //let queryString = queryService.buildQuery(this.state.filterParams);
    /*
    var queryString = Object.keys(this.state.filterParams)
      .map(key => key + "=" + this.state.filterParams[key])
      .join("&");
*/
    this.setState(
      {
        hostTypesFilterOption: this.state.hostTypes.find(x => x.lable === lable)
      },
      () => this.getHost(this.state.filterParams)
    );
  }
  async filterByOstan(lable) {
    let newfilter = this.state.filterParams;
    newfilter.ostanId = lable;
    await this.setState({
      filterParams: newfilter
    });
    this.setState(
      {
        ostanFilterOptions: this.state.ostanList.find(x => x.lable === lable)
      },
      () => this.getHost(this.state.filterParams)
    );
  }
  changePageSize(size) {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.getHost()
    );
  }
  changeDisplayMode(mode) {
    this.setState({
      displayMode: mode
    });
    return false;
  }
  onChangePage(page) {
    this.setState(
      {
        currentPage: page
      },
      () => this.getHost()
    );
  }

  async handleKeyPress(e) {
    if (e.key === "Enter") {
      let newfilter = this.state.filterParams;
      newfilter.name = e.target.value.toLowerCase();
      await this.setState(
        {
          filterParams: newfilter
        },
        () => this.getHost(this.state.filterParams)
      );

      /*
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.getHost("?name=" + this.state.search)
      );
    }
    */
    }
  }
  async handleKeyUp(e) {
    //console.log(e.target.value.toLowerCase());
    if (e.target.value.toLowerCase() === "") {
      let newfilter = this.state.filterParams;
      newfilter.name = "";
      await this.setState(
        {
          filterParams: newfilter
        },
        () => this.getHost(this.state.filterParams)
      );
    }
  }

  handleCheckChange(event, id) {
    if (
      event.target.tagName == "A" ||
      (event.target.parentElement && event.target.parentElement.tagName == "A")
    ) {
      return true;
    }
    if (this.state.lastChecked == null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  handleChangeSelectAll(isToggle) {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.id)
      });
    }
    document.activeElement.blur();
    return false;
  }
  async componentDidMount() {
    this.getHost();
    this.getHostType();
    this.getOstanList();
    //this.dataListRender();
  }
  async getHost(filterObject) {
    var service = new hostService();
    let result = await service.getHosts(filterObject);
    this.setState({ hosts: result });
    this.setState({
      totalPage: 1,
      selectedItems: [],
      totalItemCount: this.state.hosts.length,
      isLoading: true
    });
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
  async getOstanList() {
    let addrService = new addressService();
    let ostanList = await addrService.getOstan();
    let newOstan = ostanList.map(c => {
      return { column: c.name, lable: c.id };
    });
    this.setState({
      ostanList: newOstan
    });
  }
  render() {
    const startIndex =
      (this.state.currentPage - 1) * this.state.selectedPageSize;
    const endIndex = this.state.currentPage * this.state.selectedPageSize;
    const { messages } = this.props.intl;
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  <IntlMessages id="menu.host-list" />
                </h1>
                <BreadcrumbItems match={this.props.match} />
              </div>

              <div className="mb-2">
                <Button
                  color="empty"
                  className="pt-0 pl-0 d-inline-block d-md-none"
                  onClick={this.toggleDisplayOptions}
                >
                  <IntlMessages id="layouts.display-options" />{" "}
                  <i className="simple-icon-arrow-down align-middle" />
                </Button>
                <Collapse
                  isOpen={this.state.displayOptionsIsOpen}
                  className="d-md-block"
                  id="displayOptions"
                >
                  <span className="ml-3 mb-2 d-inline-block float-md-right">
                    <a
                      className={`mr-2 view-icon ${
                        this.state.displayMode === "list" ? "active" : ""
                      }`}
                      onClick={() => this.changeDisplayMode("list")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 19 19"
                      >
                        <path
                          className="view-icon-svg"
                          d="M17.5,3H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M17.5,10H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M17.5,17H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z"
                        />
                      </svg>
                    </a>
                    <a
                      className={`mr-2 view-icon ${
                        this.state.displayMode === "thumblist" ? "active" : ""
                      }`}
                      onClick={() => this.changeDisplayMode("thumblist")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 19 19"
                      >
                        <path
                          className="view-icon-svg"
                          d="M17.5,3H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M3,2V3H1V2H3m.12-1H.88A.87.87,0,0,0,0,1.88V3.12A.87.87,0,0,0,.88,4H3.12A.87.87,0,0,0,4,3.12V1.88A.87.87,0,0,0,3.12,1Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M3,9v1H1V9H3m.12-1H.88A.87.87,0,0,0,0,8.88v1.24A.87.87,0,0,0,.88,11H3.12A.87.87,0,0,0,4,10.12V8.88A.87.87,0,0,0,3.12,8Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M3,16v1H1V16H3m.12-1H.88a.87.87,0,0,0-.88.88v1.24A.87.87,0,0,0,.88,18H3.12A.87.87,0,0,0,4,17.12V15.88A.87.87,0,0,0,3.12,15Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M17.5,10H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M17.5,17H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z"
                        />
                      </svg>
                    </a>
                    <a
                      className={`mr-2 view-icon ${
                        this.state.displayMode === "imagelist" ? "active" : ""
                      }`}
                      onClick={() => this.changeDisplayMode("imagelist")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 19 19"
                      >
                        <path
                          className="view-icon-svg"
                          d="M7,2V8H1V2H7m.12-1H.88A.87.87,0,0,0,0,1.88V8.12A.87.87,0,0,0,.88,9H7.12A.87.87,0,0,0,8,8.12V1.88A.87.87,0,0,0,7.12,1Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M17,2V8H11V2h6m.12-1H10.88a.87.87,0,0,0-.88.88V8.12a.87.87,0,0,0,.88.88h6.24A.87.87,0,0,0,18,8.12V1.88A.87.87,0,0,0,17.12,1Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M7,12v6H1V12H7m.12-1H.88a.87.87,0,0,0-.88.88v6.24A.87.87,0,0,0,.88,19H7.12A.87.87,0,0,0,8,18.12V11.88A.87.87,0,0,0,7.12,11Z"
                        />
                        <path
                          className="view-icon-svg"
                          d="M17,12v6H11V12h6m.12-1H10.88a.87.87,0,0,0-.88.88v6.24a.87.87,0,0,0,.88.88h6.24a.87.87,0,0,0,.88-.88V11.88a.87.87,0,0,0-.88-.88Z"
                        />
                      </svg>
                    </a>
                  </span>

                  <div className="d-block d-md-inline-block">
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        <IntlMessages id="layouts.filter.hosttype" />
                        {this.state.hostTypesFilterOption &&
                          this.state.hostTypesFilterOption.column}
                      </DropdownToggle>
                      <DropdownMenu down>
                        <DropdownItem
                          key="0"
                          onClick={() => this.filterByHostType("")}
                        >
                          <IntlMessages id="layouts.filter.select" />
                        </DropdownItem>
                        {this.state.hostTypes.map((hostType, index) => {
                          return (
                            <DropdownItem
                              key={index + 1}
                              onClick={() =>
                                this.filterByHostType(hostType.lable)
                              }
                            >
                              {hostType.column}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        <IntlMessages id="layouts.filter.ostan" />
                        {this.state.ostanFilterOptions &&
                          this.state.ostanFilterOptions.column}
                      </DropdownToggle>
                      <DropdownMenu down>
                        <DropdownItem
                          key="0"
                          onClick={() => this.filterByOstan("")}
                        >
                          <IntlMessages id="layouts.filter.select" />
                        </DropdownItem>
                        {this.state.ostanList.map((ostan, index) => {
                          return (
                            <DropdownItem
                              key={index + 1}
                              onClick={() => this.filterByOstan(ostan.lable)}
                            >
                              {ostan.column}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                      <input
                        type="text"
                        name="keyword"
                        id="search"
                        placeholder={messages["menu.search"]}
                        onKeyPress={e => this.handleKeyPress(e)}
                        onKeyUp={e => this.handleKeyUp(e)}
                      />
                    </div>
                  </div>

                  <div className="float-md-left">
                    <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} از ${
                      this.state.totalItemCount
                    } `}</span>
                    <UncontrolledDropdown className="d-inline-block">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        {this.state.selectedPageSize}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {this.state.pageSizes.map((size, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => this.changePageSize(size)}
                            >
                              {size}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Collapse>
              </div>
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            {this.state.hosts &&
              this.state.hosts.map((host, index) => {
                if (this.state.displayMode === "imagelist") {
                  return (
                    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={host.id}>
                      <Card
                        /*onClick={event =>
                          this.handleCheckChange(event, host.id)
                        }*/
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/app/hosts/hostpage",
                            state: {
                              hostInfo: host
                            }
                          });
                        }}
                        className={classnames({
                          active: this.state.selectedItems.includes(host.id)
                        })}
                      >
                        <div className="position-relative">
                          <CardImg
                            top
                            alt={host.name}
                            src={serverConfig.fileBaseUrl + host.profileImg}
                            width="100"
                            height="250"
                          />
                          <Badge
                            color="primary"
                            pill
                            className="position-absolute badge-top-right"
                          >
                            {host.residenceType}
                          </Badge>
                        </div>
                        <CardBody>
                          <Row>
                            <Colxx xxs="2">
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_${host.id}`}
                                checked={this.state.selectedItems.includes(
                                  host.id
                                )}
                                onChange={() => {}}
                                label=""
                              />
                            </Colxx>
                            <Colxx xxs="10" className="mb-3">
                              <CardSubtitle>{host.name}</CardSubtitle>
                              <CardText className="text-muted text-small mb-0 font-weight-light">
                                {host.address.ostanName}
                              </CardText>
                              <CardText className="text-muted text-small mb-0 font-weight-light">
                                {host.address.shahrestanName}
                              </CardText>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Card>
                    </Colxx>
                  );
                } else if (this.state.displayMode === "thumblist") {
                  return (
                    <Colxx xxs="12" key={host.id} className="mb-3">
                      <Card
                        onClick={event =>
                          this.handleCheckChange(event, host.id)
                        }
                        className={classnames("d-flex flex-row", {
                          active: this.state.selectedItems.includes(host.id)
                        })}
                      >
                        <img
                          alt={host.name}
                          src={serverConfig.fileBaseUrl + host.profileImg}
                          className="list-thumbnail responsive border-0"
                          width="auto"
                        />
                        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <p
                              className="list-item-heading mb-1 truncate"
                              onClick={() => {
                                this.props.history.push({
                                  pathname: "/app/hosts/hostpage",
                                  state: {
                                    hostInfo: host
                                  }
                                });
                              }}
                            >
                              {host.name}
                            </p>

                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                              {host.residenceType}
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                              استان:{host.address.ostanName}
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                              شهر:{host.address.shahrestanName}
                            </p>
                            <HostActions
                              {...this.props}
                              hostInfo={host}
                              getHost={this.getHost}
                            />
                          </div>
                          <div
                            hidden
                            className="custom-control custom-checkbox pr-1 align-self-center pl-4"
                          >
                            <CustomInput
                              className="itemCheck mb-0"
                              type="checkbox"
                              id={`check_${host.id}`}
                              checked={this.state.selectedItems.includes(
                                host.id
                              )}
                              onChange={() => {}}
                              label=""
                            />
                          </div>
                        </div>
                      </Card>
                    </Colxx>
                  );
                } else {
                  return (
                    <Colxx xxs="12" key={host.id} className="mb-3">
                      <Card
                        onClick={event =>
                          this.handleCheckChange(event, host.id)
                        }
                        className={classnames("d-flex flex-row", {
                          active: this.state.selectedItems.includes(host.id)
                        })}
                      >
                        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <p
                              className="list-item-heading mb-1 truncate"
                              onClick={() => {
                                this.props.history.push({
                                  pathname: "/app/hosts/hostpage",
                                  state: {
                                    hostInfo: host
                                  }
                                });
                              }}
                            >
                              {host.name}
                            </p>

                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                              {host.residenceType}
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                              استان:{host.address.ostanName}
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                              شهر:{host.address.shahrestanName}
                            </p>
                            <HostActions
                              {...this.props}
                              hostInfo={host}
                              getHost={this.getHost}
                            />
                          </div>
                        </div>
                      </Card>
                    </Colxx>
                  );
                }
              })}
            <Pagination
              currentPage={this.state.currentPage}
              totalPage={this.state.totalPage}
              onChangePage={i => this.onChangePage(i)}
            />
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default injectIntl(mouseTrap(HostList));
