import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from "react-intl";
import Rating from "Components/Rating";
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
import { NavLink } from "react-router-dom";
import HostActions from "./hostActions";
class HostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "admin"
    };
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
                    <Colxx xxs="10" className="mb-3">
                      <p className="list-item-heading mb-1">
                        <NavLink to={"/hostpage/" + this.props.host.guid}>
                          <IntlMessages id="forms.host-name" />:
                          {this.props.host.name}
                        </NavLink>
                      </p>
                      <Rating total={5} rating={4} interactive={false} />

                      <Separator className="mb-1" />
                      <CardText className="text-muted text-small mb-0 font-weight-light">
                        <i className="simple-icon-location-pin" />
                        {this.props.host.address.ostanName} -
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
                <div>
                  <img
                    alt={this.props.host.name}
                    src={serverConfig.fileBaseUrl + this.props.host.profileImg}
                    className="list-thumbnail responsive border-0"
                    width="auto"
                  />
                  <Badge
                    color="primary"
                    pill
                    className="position-absolute badge-top-right"
                  >
                    {this.props.host.type}
                  </Badge>
                </div>

                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <Colxx xxs="4" className="mb-3">
                      <p className="list-item-heading mb-1">
                        <NavLink to={"/hostpage/" + this.props.host.guid}>
                          <IntlMessages id="forms.host-name" />:
                          {this.props.host.name}
                        </NavLink>
                      </p>
                      <Rating total={5} rating={4} interactive={false} />
                      <Separator className="mb-2" />
                      <p
                        className="mb-0 text-muted text-small w-sm-100 mh-10"
                        dangerouslySetInnerHTML={{
                          __html: this.props.host.description
                        }}
                      />
                    </Colxx>
                    <Colxx xxs="2" className="mb-3">
                      <IntlMessages id="forms.hostaddress" />:
                      <p className="mb-1 text-muted text-small w-sm-100">
                        <br />
                        <i className="simple-icon-location-pin" />
                        {this.props.host.address.ostanName}-
                        {this.props.host.address.shahrestanName}
                      </p>
                    </Colxx>
                    <Colxx xxs="4" className="mb-3">
                      <IntlMessages id="menu.hostservices" />:
                      {this.props.host.serviceList &&
                        this.props.host.serviceList.map((service, index) => {
                          return (
                            <div>
                              <Badge color="outline-primary mb-1 mr-1" pill>
                                {service.label}
                              </Badge>
                            </div>
                          );
                        })}
                    </Colxx>

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
