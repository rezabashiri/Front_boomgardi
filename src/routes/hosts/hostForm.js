import React, { Component, Fragment } from "react";
import addressService from "../../services/addressService.jsx";
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import hostService from "../../services/hostService.jsx";
import hostModel from "../../models/hostModel.jsx";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Select from "react-select";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";

import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

class HostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostName: this.props.hostInfo.name,
      hostTell: this.props.hostInfo.tell,
      hostDetail: null,
      hostType: [],
      hostTypeSelected: null,
      styleKey: ""
    };
    this.handleHostTellChange = this.handleHostTellChange.bind(this);
    this.addHost = this.addHost.bind(this);
    this.handleHostTypeChange = this.handleHostTypeChange.bind(this);
    this.handleHostNameChange = this.handleHostNameChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
  }
  async componentDidMount() {
    this.getHostType();
  }
  toggleAddressModal() {
    this.setState({
      addressModal: !this.state.addressModal
    });
  }
  async getHostType() {
    var typeService = new hostService();
    let hostTypes = await typeService.getHostType();
    let newHostType = hostTypes.map(c => {
      return { label: c.name, value: c.id };
    });
    console.log(newHostType);
    this.setState({
      hostType: newHostType
    });
  }

  async addHost() {
    var service = new hostService();
    var model = new hostModel();
    model["name"] = this.state.hostName;
    model["tell"] = this.state.hostTell;
    model["residencyTypeId"] = this.state.hostTypeSelected.value;
    model["ownerUserId"] = this.props.ownerUserId;
    //model["detail"] = this.state.detail;
    let result = await service.addHost(model);
    console.log("this is addhost result");
    console.log(result);
    this.props.onHandleGuId(result.guid);
  }

  handleHostTellChange(e) {
    this.setState({ hostTell: e.target.value });
  }
  handleHostNameChange(e) {
    this.setState({ hostName: e.target.value });
  }
  handleHostTypeChange = selectedHostType => {
    this.setState({ hostTypeSelected: selectedHostType });
  };
  handleDetailChange(e) {
    this.setState({ detail: e.target.value });
  }

  render() {
    return (
      <Fragment>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="menu.add-hostdata" />
                </CardTitle>
                <AvForm>
                  <AvGroup row>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="hostName">
                          <IntlMessages id="forms.host-name" />
                        </Label>
                        <AvInput
                          name="hostName"
                          id="hostName"
                          value={this.state.hostName}
                          onChange={this.handleHostNameChange}
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hostname-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label">
                          <IntlMessages id="forms.phone" />
                        </Label>
                        <AvInput
                          name="phone"
                          id="phone"
                          value={this.state.hostTell}
                          onChange={this.handleHostTellChange}
                          required
                        />
                      </AvGroup>
                      <AvFeedback>
                        <IntlMessages id="message.hosttype-message" />
                      </AvFeedback>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="hostType">
                          <IntlMessages id="forms.host-type" />
                        </Label>
                        <Select
                          id="hostType"
                          options={this.state.hostType}
                          onChange={this.handleHostTypeChange}
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hosttype-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={8}>
                      <AvGroup>
                        <Label className="av-label" for="hostDetail">
                          <IntlMessages id="forms.host-detail" />
                        </Label>
                        <AvInput
                          type="text"
                          name="hostDetail"
                          value={this.state.detail}
                          onChange={this.handleDetailChange}
                          id="hostDetail"
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hostdetail-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>
                  </AvGroup>

                  <Button onClick={this.addHost} color="primary">
                    <IntlMessages id="layouts.submit" />
                  </Button>
                </AvForm>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default HostForm;
