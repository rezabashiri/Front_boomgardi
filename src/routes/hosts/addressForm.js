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

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressModal: false,
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
      centerPosition: [this.props.addressInfo.lng, this.props.addressInfo.lat]
    };

    this.getOstanList = this.getOstanList.bind(this);
    this.getShahrestanList = this.getShahrestanList.bind(this);
    this.getBakhshList = this.getBakhshList.bind(this);
    this.getDehestanList = this.getDehestanList.bind(this);
    this.toggleAddressModal = this.toggleAddressModal.bind(this);
    this.addAddress = this.addAddress.bind(this);
  }
  async componentDidMount() {
    this.getOstanList();

    await this.setState({
      //centerPosition: [this.props.addressInfo.lng, this.props.addressInfo.lat],
      postion: [this.props.addressInfo.lng, this.props.addressInfo.lat],
      selectedOstan: {
        value: this.props.addressInfo.ostanId,
        label: this.props.addressInfo.ostanName,
        lat: this.props.addressInfo.lat,
        lng: this.props.addressInfo.lng
      },
      selectedShahr: {
        value: this.props.addressInfo.shahrestanId,
        label: this.props.addressInfo.shahrestanName
      },
      selectedBakhsh: {
        value: this.props.addressInfo.bakhshId,
        label: this.props.addressInfo.bakhshName
      },
      selectedDehestan: {
        value: this.props.addressInfo.dehestanId,
        label: this.props.addressInfo.dehestanName
      },
      selectedRoosta: {
        value: this.props.addressInfo.roostaId,
        label: this.props.addressInfo.roostaName
      }
    });

    this.getShahrestanList(this.props.addressInfo.ostanId);
    this.getBakhshList(this.props.addressInfo.shahrestanId);
    this.getDehestanList(this.props.addressInfo.bakhshId);
    this.getRoostaList(this.props.addressInfo.dehestanId);
    /*
    this.handleOstanChange({
      value: this.props.addressInfo.ostanId,
      lable: this.props.addressInfo.ostanName,
      lat: this.props.addressInfo.lat,
      lng: this.props.addressInfo.lng
    });
    this.handleShahrChange({
      value: this.props.addressInfo.shahrestanId,
      lable: this.props.addressInfo.shahrestanName
    });
    this.handleBakhshChange({
      value: this.props.addressInfo.bakhshId,
      lable: this.props.addressInfo.bakhshName
    });
    this.handleDehestanChange({
      value: this.props.addressInfo.dehestanId,
      lable: this.props.addressInfo.dehestanName
    });*/
  }
  toggleAddressModal() {
    this.setState({
      addressModal: !this.state.addressModal
    });
  }

  async addAddress() {
    var service = new hostService();
    var model = new hostModel();
    model["address"] = {
      lat: this.state.postion[1],
      lng: this.state.postion[0],
      ostanId: this.state.selectedOstan.value,
      shahrestanId: this.state.selectedShahr.value,
      bakhshId: this.state.selectedBakhsh.value,
      dehestanId: this.state.selectedDehestan.value,
      roostaId: this.state.selectedRoosta.value
    };
    model["guid"] = this.props.guid;
    let result = await service.addAddress(model);
    if (result.status === 201) {
      this.props.onHandleComplete && this.props.onHandleComplete();
      this.props.getHost && this.props.getHost();
      this.props.onToggleModal && this.props.onToggleModal();
    }
    //this.props.onHandleAttachId(result.data.attachId);
  }
  async getOstanList() {
    let addrService = new addressService();
    let ostanList = await addrService.getOstan();
    let newOstan = ostanList.map(c => {
      return { label: c.name, value: c.id, lat: c.lat, lng: c.lng };
    });
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
    this.setState({
      roosta: newRoosta
    });
  }

  handleOstanChange = selectedOstan => {
    this.setState({ selectedOstan });
    this.setState({
      selectedBakhsh: null,
      selectedShahr: null,
      selectedDehestan: null,
      selectedRoosta: null,
      centerPosition: [selectedOstan.lng, selectedOstan.lat]
    });
    this.getShahrestanList(selectedOstan.value);
  };
  handleShahrChange = selectedShahr => {
    this.setState({ selectedShahr });
    this.setState({
      selectedBakhsh: null,
      selectedDehestan: null,
      selectedRoosta: null
    });
    this.getBakhshList(selectedShahr.value);
  };
  handleBakhshChange = selectedBakhsh => {
    this.setState({ selectedBakhsh });
    this.setState({
      selectedDehestan: null,
      selectedRoosta: null
    });
    this.getDehestanList(selectedBakhsh.value);
  };
  handleDehestanChange = selectedDehestan => {
    this.setState({ selectedDehestan });
    this.setState({
      selectedRoosta: null
    });

    this.getRoostaList(selectedDehestan.value);
  };
  handleRoostaChange = selectedRoosta => {
    this.setState({ selectedRoosta });
  };
  handleEndDrag(e) {
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
                        <Label className="av-label">
                          <IntlMessages id="forms.state" />
                        </Label>
                        <Select
                          onChange={this.handleOstanChange}
                          options={this.state.ostan}
                          value={this.state.selectedOstan}
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
                          value={this.state.postion}
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
                    <Colxx sm={12}>
                      <Label className="av-label" for="hostAddress">
                        <IntlMessages id="forms.addressOnMap" />
                      </Label>
                      <AvGroup>
                        <Row className="mb-4" id="hostAddress">
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
                      </AvGroup>
                    </Colxx>
                  </AvGroup>

                  <Button onClick={this.addAddress} color="primary">
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

export default AddressForm;
