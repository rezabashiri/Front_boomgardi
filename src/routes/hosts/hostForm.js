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
import CedarMaps from "@cedarstudios/react-cedarmaps";
const {
  RotationControl,
  ZoomControl,
  ScaleControl,
  Marker,
  Feature,
  Layer
} = CedarMaps.getReactMapboxGl();

const POSITION_CIRCLE_PAINT = {
  "circle-stroke-width": 4,
  "circle-radius": 10,
  "circle-blur": 0.15,
  "circle-color": "#3770C6",
  "circle-stroke-color": "white"
};

class HostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressModal: false,
      hostName: null,
      hostTell: null,
      hostType: [],
      hostTypeSelected: null,
      ostan: [],
      shahr: [],
      selectedOstan: null,
      selectedShahr: null,
      selectedDehestan: null,
      selectedRoosta: null,
      bakhsh: [],
      dehestan: [],
      roosta: [],
      styleKey: "",
      postion: [],
      centerPosition: [51.67462, 32.65246]
    };

    this.getOstanList = this.getOstanList.bind(this);
    this.getShahrestanList = this.getShahrestanList.bind(this);
    this.getBakhshList = this.getBakhshList.bind(this);
    this.getDehestanList = this.getDehestanList.bind(this);
    this.toggleAddressModal = this.toggleAddressModal.bind(this);
    this.handleHostTellChange = this.handleHostTellChange.bind(this);
    this.addHost = this.addHost.bind(this);
    this.handleHostTypeChange = this.handleHostTypeChange.bind(this);
    this.handleHostNameChange = this.handleHostNameChange.bind(this);
  }
  async componentDidMount() {
    this.getOstanList();
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
    model["residencyTypeId"] = this.state.hostTypeSelected.name;
    model["address"] = {
      lat: this.state.postion[1],
      lng: this.state.postion[0],
      ostanId: this.state.selectedOstan.value,
      shahrestanId: this.state.selectedShahr.value,
      bakhshId: this.state.selectedBakhsh.value,
      dehestanId: this.state.selectedDehestan.value,
      roostaId: this.state.selectedRoosta.value
    };
    model["ownerUserId"] = this.props.ownerUserId;
    let result = await service.addHost(model);
    console.log("this is  result");
    console.log(result);
    this.props.onHandleAttachId(result.attachId);
  }
  async getOstanList() {
    let addrService = new addressService();
    let ostanList = await addrService.getOstan();
    let newOstan = ostanList.map(c => {
      return { label: c.name, value: c.id, lat: c.lat, lng: c.lng };
    });
    console.log(newOstan);
    this.setState({
      ostan: newOstan
    });
  }
  async getShahrestanList(codeostan) {
    let addrService = new addressService();
    let shahrestanList = await addrService.getShahrestan(codeostan);
    let newShahrestan = shahrestanList.map(c => {
      return { label: c.name, value: c.id };
    });
    console.log(newShahrestan);
    this.setState({
      shahr: newShahrestan
    });
  }
  async getBakhshList(idShahrestan) {
    let addrService = new addressService();
    let bakhshList = await addrService.getBakhsh(idShahrestan);
    let newBakhsh = bakhshList.map(c => {
      return { label: c.name, value: c.id };
    });
    console.log(newBakhsh);
    this.setState({
      bakhsh: newBakhsh
    });
  }
  async getDehestanList(idBakhsh) {
    let addrService = new addressService();
    let dehestanList = await addrService.getDehestan(idBakhsh);
    let newDehestan = dehestanList.map(c => {
      return { label: c.name, value: c.id };
    });
    console.log(newDehestan);
    this.setState({
      dehestan: newDehestan
    });
  }
  async getRoostaList(idDehestan) {
    let addrService = new addressService();
    let roostaList = await addrService.getRoosta(idDehestan);
    let newRoosta = roostaList.map(c => {
      return { label: c.name, value: c.id };
    });
    console.log(newRoosta);
    this.setState({
      roosta: newRoosta
    });
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
  handleOstanChange = selectedOstan => {
    this.setState({ selectedOstan });
    this.setState({
      selectedBakhsh: null,
      selectedShahr: null,
      selectedDehestan: null,
      selectedRoosta: null,
      centerPosition: [selectedOstan.lng, selectedOstan.lat]
    });
    console.log(`ostan selected:`, selectedOstan.value);
    this.getShahrestanList(selectedOstan.value);
  };
  handleShahrChange = selectedShahr => {
    this.setState({ selectedShahr });
    this.setState({
      selectedBakhsh: null,
      selectedDehestan: null,
      selectedRoosta: null
    });
    console.log(`shahr selected:`, selectedShahr.value);
    this.getBakhshList(selectedShahr.value);
  };
  handleBakhshChange = selectedBakhsh => {
    this.setState({ selectedBakhsh });
    this.setState({
      selectedDehestan: null,
      selectedRoosta: null
    });
    console.log(`bakhsh selected:`, selectedBakhsh.value);
    this.getDehestanList(selectedBakhsh.value);
  };
  handleDehestanChange = selectedDehestan => {
    this.setState({ selectedDehestan });
    this.setState({
      selectedRoosta: null
    });
    console.log(`dehestan selected:`, selectedDehestan.value);
    this.getRoostaList(selectedDehestan.value);
  };
  handleRoostaChange = selectedRoosta => {
    this.setState({ selectedRoosta });
    console.log(`roosta selected:`, selectedRoosta.value);
  };
  handleEndDrag(e) {
    console.log(e.lngLat.lng);
    console.log(e.lngLat.lat);
    this.setState({
      centerPosition: [e.lngLat.lng, e.lngLat.lat],
      postion: [e.lngLat.lng, e.lngLat.lat]
    });
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
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label">
                          <IntlMessages id="forms.state" />
                        </Label>
                        <Select
                          onChange={this.handleOstanChange}
                          options={this.state.ostan}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label">
                          <IntlMessages id="forms.city" />
                        </Label>
                        <Select
                          onChange={this.handleShahrChange}
                          options={this.state.shahr}
                          value={this.state.selectedShahr}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label">
                          <IntlMessages id="forms.region" />
                        </Label>
                        <Select
                          onChange={this.handleBakhshChange}
                          options={this.state.bakhsh}
                          value={this.state.selectedBakhsh}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label">
                          <IntlMessages id="forms.dehestan" />
                        </Label>
                        <Select
                          onChange={this.handleDehestanChange}
                          options={this.state.dehestan}
                          value={this.state.selectedDehestan}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label">
                          <IntlMessages id="forms.roosta" />
                        </Label>
                        <Select
                          options={this.state.roosta}
                          value={this.state.selectedRoosta}
                          onChange={this.handleRoostaChange}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="hostAddress">
                          <IntlMessages id="forms.addressOnMap" />
                        </Label>
                        <AvInput
                          type="text"
                          name="exampleAddressGrid"
                          id="hostAddress"
                          value={this.state.postion}
                          onClick={this.toggleAddressModal}
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hostaddress-message" />
                        </AvFeedback>
                      </AvGroup>
                      <Modal
                        isOpen={this.state.addressModal}
                        toggle={this.toggleAddressModal}
                        size="lg"
                      >
                        <ModalHeader toggle={this.toggleAddressModal}>
                          <IntlMessages id="modal.modal-title" />
                        </ModalHeader>
                        <ModalBody>
                          <Row className="mb-4">
                            <CedarMaps
                              containerStyle={{
                                height: "50vh",
                                width: "100%"
                              }}
                              token="59f0a6f3693d7fb3900b914cbcbce5b6775048bd"
                              preserveDrawingBuffer={false}
                              center={this.state.centerPosition}
                            >
                              <ZoomControl />
                              <ScaleControl />
                              <Layer
                                type="circle"
                                id="position-marker"
                                paint={POSITION_CIRCLE_PAINT}
                              >
                                <Feature
                                  key={1}
                                  coordinates={this.state.centerPosition}
                                  draggable={true}
                                  onDragEnd={evt => this.handleEndDrag(evt)}
                                />
                              </Layer>
                            </CedarMaps>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="primary"
                            onClick={this.toggleAddressModal}
                          >
                            ثبت
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </Colxx>

                    <Colxx sm={8}>
                      <AvGroup>
                        <Label className="av-label" for="hostDetail">
                          <IntlMessages id="forms.host-detail" />
                        </Label>
                        <AvInput
                          type="text"
                          name="hostDetail"
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
