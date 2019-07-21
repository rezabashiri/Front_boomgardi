import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { serverConfig } from "../../constants/defaultValues.js";
import classnames from "classnames";
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
import HostActions from "./hostActions";
class HostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "admin"
    };
  }
  render() {
    console.log("role in hostCard", this.props.role);
    switch (this.props.displayMode) {
      case "imagelist":
        return (
          <Fragment>
            <Colxx
              sm="6"
              lg="4"
              xl="3"
              className="mb-3"
              key={this.props.host.id}
            >
              <Card
                onClick={() => {
                  this.props.history.push({
                    pathname:
                      this.props.role === "admin"
                        ? "/app/hosts/hostpage/" + this.props.host.guid
                        : "/hostpage/" + this.props.host.guid,
                    state: {
                      hostInfo: this.props.host,
                      role: this.props.role
                    }
                  });
                }}
              >
                <div className="position-relative">
                  <CardImg
                    top
                    alt={this.props.host.name}
                    src={serverConfig.fileBaseUrl + this.props.host.profileImg}
                    width="100"
                    height="250"
                  />
                  <Badge
                    color="primary"
                    pill
                    className="position-absolute badge-top-right"
                  >
                    {this.props.host.type}
                  </Badge>
                </div>
                <CardBody>
                  <Row>
                    <Colxx xxs="2">
                      <CustomInput
                        className="itemCheck mb-0"
                        type="checkbox"
                        id={`check_${this.props.host.id}`}
                        onChange={() => {}}
                        label=""
                      />
                    </Colxx>
                    <Colxx xxs="10" className="mb-3">
                      <CardSubtitle>{this.props.host.name}</CardSubtitle>
                      <CardText className="text-muted text-small mb-0 font-weight-light">
                        {this.props.host.address.ostanName}
                      </CardText>
                      <CardText className="text-muted text-small mb-0 font-weight-light">
                        {this.props.host.address.shahrestanName}
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
            <Colxx xxs="12" key={this.props.host.id} className="mb-3">
              <Card className={classnames("d-flex flex-row")}>
                <img
                  alt={this.props.host.name}
                  src={serverConfig.fileBaseUrl + this.props.host.profileImg}
                  className="list-thumbnail responsive border-0"
                  width="auto"
                />
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <p
                      className="list-item-heading mb-1 truncate w-15"
                      onClick={() => {
                        this.props.history.push({
                          pathname:
                            this.props.role === "admin"
                              ? "/app/hosts/hostpage/" + this.props.host.guid
                              : "/hostpage/" + this.props.host.guid,
                          state: {
                            hostInfo: this.props.host,
                            role: this.props.role
                          }
                        });
                      }}
                    >
                      {this.props.host.name}
                    </p>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      {this.props.host.type}
                    </p>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      استان:{this.props.host.address.ostanName}
                    </p>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      شهر:{this.props.host.address.shahrestanName}
                    </p>
                    <HostActions
                      {...this.props}
                      hostInfo={this.props.host}
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
                      id={`check_${this.props.host.id}`}
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
            <Colxx xxs="12" key={this.props.host.id} className="mb-3">
              <Card className={classnames("d-flex flex-row")}>
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <p
                      className="list-item-heading mb-1 truncate w-15"
                      onClick={() => {
                        this.props.history.push({
                          pathname:
                            this.props.role === "admin"
                              ? "/app/hosts/hostpage/" + this.props.host.guid
                              : "/hostpage/" + this.props.host.guid,
                          state: {
                            hostInfo: this.props.host,
                            role: this.props.role
                          }
                        });
                      }}
                    >
                      {this.props.host.name}
                    </p>

                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      {this.props.host.type}
                    </p>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      استان:{this.props.host.address.ostanName}
                    </p>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      شهر:{this.props.host.address.shahrestanName}
                    </p>
                    <HostActions
                      {...this.props}
                      hostInfo={this.props.host}
                      getHost={this.getHost}
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

export default HostCard;
