import React, { Component } from "react";
import { injectIntl } from "react-intl";
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
    this.state = {};
  }
  render() {
    <Fragment>
      <Row>
        if (this.props.displayMode === "imagelist")
        {
          <Colxx sm="6" lg="4" xl="3" className="mb-3" key={this.props.host.id}>
            <Card
              onClick={() => {
                this.props.history.push({
                  pathname: "/app/hosts/hostpage",
                  state: {
                    hostInfo: this.props.host
                  }
                });
              }}
              className={classnames({
                active: this.state.selectedItems.includes(this.props.host.id)
              })}
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
                      checked={this.state.selectedItems.includes(
                        this.props.host.id
                      )}
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
        }
        if (this.props.displayMode === "thumblist")
        {
          <Colxx xxs="12" key={this.props.host.id} className="mb-3">
            <Card
              onClick={event =>
                this.handleCheckChange(event, this.props.host.id)
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
                    className="list-item-heading mb-1 truncate w-15"
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
                    {host.type}
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
                    checked={this.state.selectedItems.includes(host.id)}
                    onChange={() => {}}
                    label=""
                  />
                </div>
              </div>
            </Card>
          </Colxx>
        }
        else
        {
          <Colxx xxs="12" key={host.id} className="mb-3">
            <Card
              onClick={event => this.handleCheckChange(event, host.id)}
              className={classnames("d-flex flex-row", {
                active: this.state.selectedItems.includes(host.id)
              })}
            >
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <p
                    className="list-item-heading mb-1 truncate w-15"
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
                    {host.type}
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
        }
      </Row>
    </Fragment>;
  }
}

export default HostCard;
