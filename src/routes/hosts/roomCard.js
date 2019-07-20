import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { serverConfig } from "../../constants/defaultValues.js";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CustomInput,
  CardBody,
  CardSubtitle,
  CardImg,
  Label,
  CardText,
  Badge
} from "reactstrap";
import RoomActions from "./roomActions";
class RoomCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    switch (this.props.displayMode) {
      case "imagelist":
        return (
          <Fragment>
            <Colxx
              sm="6"
              lg="4"
              xl="3"
              className="mb-3"
              key={this.props.room.id}
            >
              <Card
                onClick={event =>
                  this.handleCheckChange(event, this.props.room.id)
                }
              >
                <div className="position-relative">
                  <NavLink
                    to={`?p=${this.props.room.id}`}
                    className="w-40 w-sm-100"
                  >
                    <CardImg
                      top
                      alt={this.props.room.name}
                      src={
                        serverConfig.fileBaseUrl + this.props.room.profileImg
                      }
                      width="100"
                      height="250"
                    />
                    <Badge
                      color="primary"
                      pill
                      className="position-absolute badge-top-right"
                    >
                      {this.props.room.type}
                    </Badge>
                  </NavLink>
                </div>
                <CardBody>
                  <Row>
                    <Colxx xxs="2">
                      <CustomInput
                        className="itemCheck mb-0"
                        type="checkbox"
                        id={`check_${this.props.room.id}`}
                        onChange={() => {}}
                        label=""
                      />
                    </Colxx>
                    <Colxx xxs="10" className="mb-3">
                      <CardSubtitle>{this.props.room.name}</CardSubtitle>
                      <CardText className="text-muted text-small mb-0 font-weight-light">
                        {this.props.room.type}
                      </CardText>
                      <CardText
                        hidden
                        className="text-muted text-small mb-0 font-weight-light"
                      >
                        {this.props.room.serviceList &&
                          this.props.room.serviceList.map((service, index) => {
                            return (
                              <Badge color="outline-primary mb-1 mr-1" pill>
                                {service.label}
                              </Badge>
                            );
                          })}
                      </CardText>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
            </Colxx>
          </Fragment>
        );
        break;
      case "thumblist":
        return (
          <Fragment>
            <Colxx xxs="12" key={this.props.room.id} className="mb-3">
              <Card
                onClick={event =>
                  this.handleCheckChange(event, this.props.room.id)
                }
                className={classnames("d-flex flex-row")}
              >
                <NavLink to={`?p=${this.props.room.id}`} className="d-flex">
                  <img
                    alt={this.props.room.name}
                    src={serverConfig.fileBaseUrl + this.props.room.profileImg}
                    className="list-thumbnail responsive border-0"
                    width="auto"
                  />
                </NavLink>
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <NavLink
                      to={`?p=${this.props.room.id}`}
                      className="w-15 w-sm-100"
                    >
                      <p className="list-item-heading mb-1 truncate">
                        {this.props.room.name}
                      </p>
                    </NavLink>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      <IntlMessages id="forms.room-capacity" />
                      {": "}
                      {this.props.room.capacity}
                    </p>
                    <p className="mb-1 text-muted text-small w-30 w-sm-100">
                      <IntlMessages id="forms.room-detail" />
                      {": "}
                      {this.props.room.description}
                    </p>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      <IntlMessages id="forms.room-type" />
                      {": "}
                      {this.props.room.type}
                    </p>
                    <RoomActions
                      roomInfo={this.props.room}
                      onGetRooms={this.getRoom}
                      role={this.props.role}
                    />
                  </div>
                  <div
                    hidden
                    className="custom-control custom-checkbox pr-1 align-self-center pl-4"
                  >
                    <CustomInput
                      className="itemCheck mb-0"
                      type="checkbox"
                      id={`check_${this.props.room.id}`}
                      onChange={() => {}}
                      label=""
                    />
                  </div>
                </div>
              </Card>
            </Colxx>
          </Fragment>
        );
        break;
      case "list":
        return (
          <Fragment>
            <Colxx xxs="12" key={this.props.room.id} className="mb-3">
              <Card
                onClick={event =>
                  this.handleCheckChange(event, this.props.room.id)
                }
                className={classnames("d-flex flex-row")}
              >
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <NavLink
                      to={`?name=${this.props.room.name}`}
                      className="w-15 w-sm-100"
                    >
                      <p className="list-item-heading mb-1 truncate">
                        {this.props.room.name}
                      </p>
                    </NavLink>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      <IntlMessages id="forms.room-capacity" />
                      {": "}
                      {this.props.room.capacity}
                    </p>
                    <p className="mb-1 text-muted text-small w-30 w-sm-100">
                      <IntlMessages id="forms.room-detail" />
                      {": "}
                      {this.props.room.description}
                    </p>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      <IntlMessages id="forms.room-type" />
                      {": "}
                      {this.props.room.type}
                    </p>
                    <RoomActions
                      roomInfo={this.props.room}
                      onGetRooms={this.getRoom}
                      role={this.props.role}
                    />
                  </div>
                </div>
              </Card>
            </Colxx>
          </Fragment>
        );
        break;
      default:
        return <div>{this.props}</div>;
    }
  }
}

export default RoomCard;
