import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import RoomList from "./room-list";
import { serverConfig } from "../../constants/defaultValues.js";
import HostActions from "./hostActions";
import hostService from "../../services/hostService.jsx";
//import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardSubtitle,
  CardTitle
} from "reactstrap";
import Rating from "Components/Rating";
import { SmallLineChart } from "Components/Charts";
import {
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4
} from "Constants/chartConfig";

import { LineShadow } from "Components/Charts";
import { areaChartConfig } from "Constants/chartConfig";

import { NavLink } from "react-router-dom";
import CircularProgressbar from "react-circular-progressbar";

import { Colxx } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";

import classnames from "classnames";

export default class HostPage extends Component {
  constructor(props) {
    super(props);

    this.toggleTab = this.toggleTab.bind(this);
    this.getHostPics = this.getHostPics.bind(this);
    this.state = {
      activeFirstTab: "1",
      hostInfo: this.props.location.state.hostInfo,
      hostPics: [],
      itemsUrl: []
    };
  }

  componentDidMount() {
    this.getHostPics(this.state.hostInfo.guid);
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }
  async getHostPics(guid) {
    var service = new hostService();
    let result = await service.getHostPics("?attachId=" + guid);
    if (result.status === 200) {
      let picsUrl = [];
      let itemUrl = [];
      result.data.map((attach, index) => {
        picsUrl[index] = attach.virtualAddress;
        itemUrl[index] = {
          original: serverConfig.fileBaseUrl + attach.virtualAddress,
          thumbnail: serverConfig.fileBaseUrl + attach.virtualAddress,
          sizes: "10px , 10px"
        };
      });
      this.setState({ hostPics: picsUrl, itemsUrl: itemUrl });

      console.log(picsUrl);
      console.log(itemUrl);
    }
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div className="float-sm-left mb-2">
              <HostActions {...this.props} hostInfo={this.state.hostInfo} />
            </div>

            <BreadcrumbItems match={this.props.match} />
            <Nav tabs className="separator-tabs ml-0 mb-5">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "1",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("1");
                  }}
                  to="#"
                >
                  <IntlMessages id="layouts.details" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "2",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("2");
                  }}
                  to="#"
                >
                  <IntlMessages id="layouts.orders" />
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeFirstTab}>
              <TabPane tabId="1">
                {this.state.activeFirstTab === "1" ? (
                  <Fragment>
                    <Row>
                      <Colxx xxs="12" lg="6" className="mb-4">
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.host-name" />
                        </p>
                        <p className="mb-3">
                          {this.state.hostInfo.name}
                          <br />
                        </p>
                        <p
                          className="mb-3"
                          dangerouslySetInnerHTML={{
                            __html: this.state.hostInfo.description
                          }}
                        />
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="forms.address" />
                        </p>
                        <p className="mb-3">
                          {this.state.hostInfo.address.ostanName} ,
                          {this.state.hostInfo.address.shahrestanName},{" "}
                          {this.state.hostInfo.address.bakhshName},{" "}
                          {this.state.hostInfo.address.dehestanName},{" "}
                          {this.state.hostInfo.address.roostaName}
                        </p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="menu.hostservices" />
                        </p>
                        <div className="mb-3">
                          <p className="d-sm-inline-block mb-1">
                            {this.state.hostInfo.serviceList &&
                              this.state.hostInfo.serviceList.map(
                                (service, index) => {
                                  <Badge
                                    color="outline-secondary mb-1 mr-1"
                                    pill
                                  >
                                    {service.label}
                                  </Badge>;
                                }
                              )}
                          </p>
                        </div>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="layouts.rating" />
                        </p>

                        <div className="mb-3">
                          <Rating total={5} rating={5} interactive={true} />
                        </div>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="layouts.is-vegan" />
                        </p>
                        <p>خیر</p>
                      </Colxx>
                      <Colxx xxs="12" lg="6" className="mb-4">
                        <ImageGallery items={this.state.itemsUrl} />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" lg="12">
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="menu.roomslist" />
                        </p>
                        <RoomList
                          residenceId={this.state.hostInfo.id}
                          {...this.props}
                        />
                      </Colxx>
                    </Row>
                  </Fragment>
                ) : null}
              </TabPane>
              <TabPane tabId="2">
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>
                      <IntlMessages id="layouts.popularity" />
                    </CardTitle>
                    <div className="chart-container">
                      <LineShadow {...areaChartConfig} />
                    </div>
                  </CardBody>
                </Card>

                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>
                      <IntlMessages id="layouts.comments" />
                    </CardTitle>
                    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                      <NavLink to="#">
                        <img
                          alt="Profile"
                          src="/assets/img/profile-pic-l.jpg"
                          className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                        />
                      </NavLink>
                      <div className="pl-3 pr-2">
                        <NavLink to="#">
                          <p className="font-weight-medium mb-0">
                            خیلی خوشمزس..{" "}
                          </p>
                          <p className="text-muted mb-1 text-small">
                            مریم کیانی | 27 مرداد 1397
                          </p>
                          <div className="form-group mb-0">
                            <Rating total={5} rating={5} interactive={false} />
                          </div>
                        </NavLink>
                      </div>
                    </div>

                    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                      <NavLink to="#">
                        <img
                          alt="Profile"
                          src="/assets/img/profile-pic-l-4.jpg"
                          className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                        />
                      </NavLink>
                      <div className="pl-3 pr-2">
                        <NavLink to="#">
                          <p className="font-weight-medium mb-0">
                            محیط دلنشینی داشت
                          </p>
                          <p className="text-muted mb-1 text-small">
                            ندا کریمی | 15 اردیبهشت 1395
                          </p>
                          <div className="form-group mb-0">
                            <Rating total={5} rating={5} interactive={false} />
                          </div>
                        </NavLink>
                      </div>
                    </div>

                    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                      <NavLink to="#">
                        <img
                          alt="Profile"
                          src="/assets/img/profile-pic-l-2.jpg"
                          className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                        />
                      </NavLink>
                      <div className="pl-3 pr-2">
                        <NavLink to="#">
                          <p className="font-weight-medium mb-0">
                            راهش خیلی دور بود
                          </p>
                          <p className="text-muted mb-1 text-small">
                            محمد محمد زاده محمدی | 10 دی 1397
                          </p>
                          <div className="form-group mb-0">
                            <Rating total={5} rating={2} interactive={false} />
                          </div>
                        </NavLink>
                      </div>
                    </div>

                    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                      <NavLink to="#">
                        <img
                          alt="Profile"
                          src="/assets/img/profile-pic-l-3.jpg"
                          className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                        />
                      </NavLink>
                      <div className="pl-3 pr-2">
                        <NavLink to="#">
                          <p className="font-weight-medium mb-0">
                            خیلی عالی دارین کار میکنید.
                          </p>
                          <p className="text-muted mb-1 text-small">
                            لیلا رشیدی | 25 خرداد 1397
                          </p>
                          <div className="form-group mb-0">
                            <Rating total={5} rating={5} interactive={false} />
                          </div>
                        </NavLink>
                      </div>
                    </div>

                    <div className="d-flex flex-row">
                      <NavLink to="#">
                        <img
                          alt="Profile"
                          src="/assets/img/profile-pic-l-7.jpg"
                          className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                        />
                      </NavLink>
                      <div className="pl-3 pr-2">
                        <NavLink to="#">
                          <p className="font-weight-medium mb-0">
                            قشنگتر از عکس هاش بود
                          </p>
                          <p className="text-muted mb-1 text-small">
                            آشپز | 18 شهریور 1397
                          </p>
                          <div className="form-group mb-0">
                            <Rating total={5} rating={3} interactive={false} />
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </CardBody>
                  <Colxx xxs="12" lg="6" className="mb-4">
                    <Card className="mb-4">
                      <CardBody className="d-flex justify-content-between align-items-center">
                        <CardSubtitle className="mb-0">
                          <IntlMessages id="layouts.order-status" />
                        </CardSubtitle>
                        <div className="progress-bar-circle">
                          <CircularProgressbar
                            strokeWidth={4}
                            percentage={85}
                            text={"85%"}
                          />
                        </div>
                      </CardBody>
                    </Card>

                    <Card className="mb-4">
                      <CardBody className="d-flex justify-content-between align-items-center">
                        <CardSubtitle className="mb-0">
                          <IntlMessages id="layouts.bake-progress" />
                        </CardSubtitle>
                        <div className="progress-bar-circle">
                          <CircularProgressbar
                            strokeWidth={4}
                            percentage={40}
                            text={"40%"}
                          />
                        </div>
                      </CardBody>
                    </Card>
                    <Row>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart">
                          <CardBody>
                            <SmallLineChart {...smallChartData1} />
                          </CardBody>
                        </Card>
                      </Colxx>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart">
                          <CardBody>
                            <SmallLineChart {...smallChartData2} />
                          </CardBody>
                        </Card>
                      </Colxx>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart">
                          <CardBody>
                            <SmallLineChart {...smallChartData3} />
                          </CardBody>
                        </Card>
                      </Colxx>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart">
                          <CardBody>
                            <SmallLineChart {...smallChartData4} />
                          </CardBody>
                        </Card>
                      </Colxx>
                    </Row>
                  </Colxx>
                </Card>
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
        <Row />
      </Fragment>
    );
  }
}
