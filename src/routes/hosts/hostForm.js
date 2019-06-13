import React, { Component, Fragment } from "react";
import addressService from "../../services/addressService.jsx";
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
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
  CardSubtitle
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
      postion: [51.68440411028229, 32.64206332406948],
      centerPosition: [51.68440411028229, 32.64206332406948]
    };

    this.getOstanList = this.getOstanList.bind(this);
    this.getShahrestanList = this.getShahrestanList.bind(this);
    this.getBakhshList = this.getBakhshList.bind(this);
    this.getDehestanList = this.getDehestanList.bind(this);
  }
  async componentDidMount() {
    this.getOstanList();
  }

  async getOstanList() {
    let addrService = new addressService();
    let ostanList = await addrService.getOstan();
    let newOstan = ostanList.map(c => {
      return { label: c.sharh, value: c.id };
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
      return { label: c.sharh, value: c.id };
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
      return { label: c.sharh, value: c.id };
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
      return { label: c.sharh, value: c.id };
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
      return { label: c.sharh, value: c.id };
    });
    console.log(newRoosta);
    this.setState({
      roosta: newRoosta
    });
  }
  handleOstanChange = selectedOstan => {
    this.setState({ selectedOstan });
    console.log(`ostan selected:`, selectedOstan.value);
    this.getShahrestanList(selectedOstan.value);
  };
  handleShahrChange = selectedShahr => {
    this.setState({ selectedShahr });
    console.log(`shahr selected:`, selectedShahr.value);
    this.getBakhshList(selectedShahr.value);
  };
  handleBakhshChange = selectedBakhsh => {
    this.setState({ selectedBakhsh });
    console.log(`bakhsh selected:`, selectedBakhsh.value);
    this.getDehestanList(selectedBakhsh.value);
  };
  handleDehestanChange = selectedDehestan => {
    this.setState({ selectedDehestan });
    console.log(`dehestan selected:`, selectedDehestan.value);
    this.getRoostaList(selectedDehestan.value);
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
                    <Colxx sm={6}>
                      <AvGroup>
                        <Label className="av-label" for="hostName">
                          <IntlMessages id="forms.host-name" />
                        </Label>
                        <AvInput name="hostName" id="hostName" required />
                        <AvFeedback>
                          <IntlMessages id="forms.hostname-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <AvGroup>
                        <Label className="av-label" for="hostAddress">
                          <IntlMessages id="forms.address" />
                        </Label>
                        <AvInput
                          type="text"
                          name="exampleAddressGrid"
                          id="hostAddress"
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hostaddress-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <AvGroup>
                        <Label className="av-label" for="hostDetail">
                          <IntlMessages id="forms.host-detail" />
                        </Label>
                        <AvInput
                          type="text"
                          name="hostDetail"
                          id="hostDetail"
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hostdetail-message" />
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
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label">
                          <IntlMessages id="forms.roosta" />
                        </Label>
                        <Select options={this.state.roosta} />
                      </AvGroup>
                    </Colxx>
                  </AvGroup>

                  <Button color="primary">
                    <IntlMessages id="layouts.submit" />
                  </Button>
                </AvForm>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row className="mb-4">
          <CedarMaps
            containerStyle={{
              height: "70vh",
              width: "70%"
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
      </Fragment>
    );
  }
}

export default HostForm;
