import React, { Component, Fragment } from "react";
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
  FormText,
  Form,
  CardSubtitle
} from "reactstrap";
import Button from "reactstrap-button-loader";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvField
} from "availity-reactstrap-validation";

import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";
import { nameValidation } from "../../constants/validations";

class HostPriceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricePolicy: null,
      perPerson: null,
      perPersonPicTime: null,
      offPerPerson: null,
      offPerPersonPicTime: null,
      minCapacity: null,
      perRoom: null,
      perRoomPicTime: null,
      offPerRoom: null,
      offPerRoomPicTime: null,
      maxCapacity: null,
      loading: 0
    };

    this.onPriceSave = this.onPriceSave.bind(this);
  }
  async onPriceSave(event, value) {
    this.setState({
      loading: 1
    });
    event.preventDefault();

    //Object.keys(value).map(key => (model[key] = value[key]));

    //let form = new FormData(event.target);
    //let model = new userModel();
    //let usrService = new userService();
    //form.forEach((value, key) => (model[key] = value));
    //let result = await usrService.addUser(model);
    /*if (result.status === 201) {
      this.setState({
        loading: 0
      });
      this.props.onToggleModal && this.props.onToggleModal();
    }*/
  }

  async componentDidMount() {
    if (this.props.hostInfo.price) {
      this.setState({
        pricePolicy: this.props.hostInfo.price.pricePolicy,
        perPerson: this.props.hostInfo.price.perPerson,
        perPersonPicTime: this.props.hostInfo.price.perPersonPicTime,
        offPerPerson: this.props.hostInfo.price.offPerPerson,
        offPerPersonPicTime: this.props.hostInfo.price.offPerPersonPicTime,
        minCapacity: this.props.hostInfo.price.minCapacity,
        perRoom: this.props.hostInfo.price.perRoom,
        perRoomPicTime: this.props.hostInfo.price.perRoomPicTime,
        offPerRoom: this.props.hostInfo.price.offPerRoom,
        offPerRoomPicTime: this.props.hostInfo.price.offPerRoomPicTime,
        maxCapacity: this.props.hostInfo.price.maxCapacity
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="room.price" />
                </CardTitle>
                <Label className="av-label" for="perPerson">
                  <IntlMessages id="room.price.perPerson" />
                </Label>
                <AvForm
                  className="mb-5 row"
                  onValidSubmit={async (e, v) => await this.onPriceSave(e, v)}
                >
                  <Row>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="perPerson">
                          <IntlMessages id="room.price.notPicTime" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="perPerson"
                          id="perPerson"
                          value={this.state.perPerson}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="perPersonPicTime">
                          <IntlMessages id="room.price.picTime" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="perPersonPicTime"
                          id="perPersonPicTime"
                          value={this.state.perPersonPicTime}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="offPerPerson">
                          <IntlMessages id="room.price.off" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="offPerPerson"
                          id="offPerPerson"
                          value={this.state.offPerPerson}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="offPerPersonPicTime">
                          <IntlMessages id="room.price.offPicTime" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="offPerPersonPicTime"
                          id="offPerPersonPicTime"
                          value={this.state.offPerPersonPicTime}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="minCapacity">
                          <IntlMessages id="room.minCapacity" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="minCapacity"
                          id="minCapacity"
                          value={this.state.minCapacity}
                        />
                      </AvGroup>
                    </Colxx>
                  </Row>
                  <Label className="av-label" for="perRoom">
                    <IntlMessages id="room.price.perRoom" />
                  </Label>
                  <Row>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="perRoom">
                          <IntlMessages id="room.price.notPicTime" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="perRoom"
                          id="perRoom"
                          value={this.state.perRoom}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="perRoomPicTime">
                          <IntlMessages id="room.price.picTime" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="perRoomPicTime"
                          id="perRoomPicTime"
                          value={this.state.perRoomPicTime}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="offPerRoom">
                          <IntlMessages id="room.price.off" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="offPerRoom"
                          id="offPerRoom"
                          value={this.state.offPerRoom}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="offPerRoomPicTime">
                          <IntlMessages id="room.price.offPicTime" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="offPerRoomPicTime"
                          id="offPerRoomPicTime"
                          value={this.state.offPerRoomPicTime}
                        />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="maxCapacity">
                          <IntlMessages id="room.maxCapacity" />
                        </Label>
                        <AvField
                          className="form-control"
                          name="maxCapacity"
                          id="maxCapacity"
                          value={this.state.maxCapacity}
                        />
                      </AvGroup>
                    </Colxx>
                  </Row>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Button
                        color="primary"
                        className="btn-shadow"
                        type="submit"
                        loading={this.state.loading}
                      >
                        <IntlMessages id="layouts.submit" />
                      </Button>
                    </FormGroup>
                  </Colxx>
                </AvForm>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default HostPriceForm;
