import React, { Component, Fragment } from "react";
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
  FormText,
  Form,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Button from "reactstrap-button-loader";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvField
} from "availity-reactstrap-validation";

import { tellValidation, nameValidation } from "../../constants/validations";

import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link"],
    ["clean"]
  ]
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link"
];

class HostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 0,
      hostName: this.props.hostInfo.name,
      hostTell: this.props.hostInfo.tell,
      hostType: [],
      hostTypeSelected: null,
      hostInformation: this.props.hostInfo.description
        ? this.props.hostInfo.description
        : ""
    };
    this.handleHostTellChange = this.handleHostTellChange.bind(this);
    this.addHost = this.addHost.bind(this);
    this.handleHostTypeChange = this.handleHostTypeChange.bind(this);
    this.handleHostNameChange = this.handleHostNameChange.bind(this);
    this.handleChangeHostInformation = this.handleChangeHostInformation.bind(
      this
    );
  }
  async componentDidMount() {
    this.getHostType();
    this.setState({
      hostTypeSelected: {
        value: this.props.hostInfo.residencyTypeId,
        label: this.props.hostInfo.residenceType
      }
    });
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
    this.setState({
      hostType: newHostType
    });
  }

  async addHost() {
    this.setState({
      loading: 1
    });
    var service = new hostService();
    var model = new hostModel();
    model["name"] = this.state.hostName;
    model["tell"] = this.state.hostTell;
    model["residencyTypeId"] = this.state.hostTypeSelected.value;
    model["ownerUserId"] = this.props.ownerUserId;
    model["guid"] = this.props.hostInfo.guid;
    model["description"] = this.state.hostInformation;
    let result = await service.addHost(model);
    if (result.status === 201) {
      this.setState({
        loading: 0
      });
      this.props.onHandleComplete && this.props.onHandleComplete();
      this.props.onHandleGuId && this.props.onHandleGuId(result.data.guid);
      this.props.getHost && this.props.getHost();
      this.props.onToggleModal && this.props.onToggleModal();
    }
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

  handleChangeHostInformation(hostInformation) {
    this.setState({ hostInformation });
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
                <AvForm onValidSubmit={this.addHost}>
                  <AvGroup row>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="hostName">
                          <IntlMessages id="forms.host-name" />
                        </Label>
                        <AvField
                          name="hostName"
                          id="hostName"
                          value={this.state.hostName}
                          onChange={this.handleHostNameChange}
                          validate={nameValidation}
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
                        <AvField
                          name="phone"
                          id="phone"
                          value={this.state.hostTell}
                          onChange={this.handleHostTellChange}
                          validate={tellValidation}
                        />
                      </AvGroup>
                      <AvFeedback>
                        <IntlMessages id="forms.host-type-message" />
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
                          value={this.state.hostTypeSelected}
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hosttype-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <AvGroup>
                        <Label className="av-label" for="hostDetail">
                          <IntlMessages id="forms.host-detail" />
                        </Label>
                        <ReactQuill
                          theme="snow"
                          value={this.state.hostInformation}
                          onChange={this.handleChangeHostInformation}
                          modules={quillModules}
                          formats={quillFormats}
                        />
                      </AvGroup>
                    </Colxx>
                  </AvGroup>
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    type="submit"
                    loading={this.state.loading}
                  >
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
