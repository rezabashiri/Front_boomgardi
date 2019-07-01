import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import RoomList from "./room-list";
import { serverConfig } from "../../constants/defaultValues.js";
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
    this.state = {
      activeFirstTab: "1",
      hostInfo: this.props.location.state.hostInfo
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }

  render() {
    console.log(this.state.activeFirstTab);
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div className="float-sm-left mb-2">
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  color="primary"
                  size="lg"
                  outline
                  className="top-right-button top-right-button-single"
                >
                  <IntlMessages id="layouts.actions" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>
                    <IntlMessages id="layouts.header" />
                  </DropdownItem>
                  <DropdownItem disabled>
                    <IntlMessages id="layouts.delete" />
                  </DropdownItem>
                  <DropdownItem>
                    <IntlMessages id="layouts.another-action" />
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <IntlMessages id="layouts.another-action" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
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
                  <Row>
                    <Colxx xxs="12" lg="4" className="mb-4">
                      <Card className="mb-4">
                        <div className="position-absolute card-top-buttons">
                          <Button
                            outline
                            color={"white"}
                            className="icon-button"
                          >
                            <i className="simple-icon-pencil" />
                          </Button>
                        </div>
                        <img
                          src={
                            serverConfig.fileBaseUrl +
                            this.state.hostInfo.profileImg
                          }
                          alt={this.state.hostInfo.name}
                          className="card-img-top"
                        />

                        <CardBody>
                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="layouts.description" />
                          </p>
                          <p className="mb-3">
                            {this.state.hostInfo.name}
                            <br />
                            اقامتگاه با محیطی دلنشین همراه با گشت جاذبه های
                            دیدنی اطراف
                            <br />
                            <br /> گشت منطقه و سرویس ناهار و شام ارگانیک
                          </p>

                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="layouts.rating" />
                          </p>
                          <div className="mb-3">
                            <Rating total={5} rating={5} interactive={true} />
                          </div>

                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="forms.address" />
                          </p>
                          <p className="mb-3">
                            {this.state.hostInfo.address.ostanName}
                          </p>
                          <p className="mb-3">
                            {this.state.hostInfo.address.shahrestanName}
                          </p>
                          <p className="mb-3">
                            {this.state.hostInfo.address.bakhshName}
                          </p>
                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="layouts.ingredients" />
                          </p>
                          <div className="mb-3">
                            <p className="d-sm-inline-block mb-1">
                              <Badge color="outline-secondary mb-1 mr-1" pill>
                                بومگردی
                              </Badge>
                              <Badge color="outline-secondary mb-1 mr-1" pill>
                                عشایری
                              </Badge>
                              <Badge color="outline-secondary mb-1 mr-1" pill>
                                تورلیدر
                              </Badge>
                              <Badge color="outline-secondary mb-1 mr-1" pill>
                                تورها
                              </Badge>
                              <Badge color="outline-secondary mb-1 mr-1" pill>
                                آژانس‌ها
                              </Badge>
                              <Badge color="outline-secondary mb-1 mr-1" pill>
                                اقامتگاه
                              </Badge>
                              <Badge color="outline-secondary mb-1 mr-1" pill>
                                غذای محلی
                              </Badge>
                            </p>
                          </div>

                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="layouts.is-vegan" />
                          </p>
                          <p>خیر</p>
                        </CardBody>
                      </Card>

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
                    </Colxx>

                    <Colxx xxs="12" lg="8">
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
                                  <Rating
                                    total={5}
                                    rating={5}
                                    interactive={false}
                                  />
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
                                  <Rating
                                    total={5}
                                    rating={5}
                                    interactive={false}
                                  />
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
                                  <Rating
                                    total={5}
                                    rating={2}
                                    interactive={false}
                                  />
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
                                  <Rating
                                    total={5}
                                    rating={5}
                                    interactive={false}
                                  />
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
                                  <Rating
                                    total={5}
                                    rating={3}
                                    interactive={false}
                                  />
                                </div>
                              </NavLink>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                ) : null}
              </TabPane>
              <TabPane tabId="2">
                <RoomList {...this.props} />
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
        <Row />
      </Fragment>
    );
  }
}
