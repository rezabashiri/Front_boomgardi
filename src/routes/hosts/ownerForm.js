import React, { Component, Fragment } from "react";
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import userService from "../../services/userService.jsx";
import userModel from "../../models/registerModel.jsx";

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
import registerService from "../../services/registerService.jsx";

class OwnerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      mobile: null,
      codeMeli: null
    };
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeCodeMeli = this.handleChangeCodeMeli.bind(this);
    this.onOwnerSave = this.onOwnerSave.bind(this);
  }
  async onOwnerSave(event) {
    event.preventDefault();
    //let form = new FormData(event.target);
    let model = new userModel();
    let usrService = new userService();
    //form.forEach((value, key) => (model[key] = value));
    model["roles"] = "اقامتگاه";
    model["firstName"] = this.state.firstName;
    model["userName"] = this.state.mobile;
    model["password"] = this.state.codeMeli;
    let result = await usrService.addUser(model);
    this.props.onHandleOwnerUserId(result.id);
  }

  handleChangeFirstName(e) {
    this.setState({ firstName: e.target.value });
  }
  handleChangeLastName(e) {
    this.setState({ lastName: e.target.value });
  }
  handleChangeMobile(e) {
    this.setState({ mobile: e.target.value });
  }
  handleChangeCodeMeli(e) {
    this.setState({ codeMeli: e.target.value });
  }

  render() {
    return (
      <Fragment>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="menu.add-hostowner" />
                </CardTitle>

                <AvForm className="mb-5 row" onSubmit={this.onOwnerSave}>
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="firstName">
                        <IntlMessages id="forms.firstname" />
                      </Label>
                      <AvInput
                        className="form-control"
                        name="firstName"
                        id="firstName"
                        required
                        value={this.state.firstName}
                        onChange={this.handleChangeFirstName}
                      />
                      <AvFeedback>
                        <IntlMessages id="forms.firstname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="lastName">
                        <IntlMessages id="forms.lastname" />
                      </Label>

                      <AvInput
                        name="lastName"
                        id="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChangeLastName}
                        required
                      />
                      <AvFeedback>
                        <IntlMessages id="forms.lastname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="mobile">
                        <IntlMessages id="forms.mobile" />
                      </Label>
                      <AvInput
                        name="mobile"
                        id="mobile"
                        value={this.state.mobile}
                        onChange={this.handleChangeMobile}
                        required
                      />
                      <AvFeedback>
                        <IntlMessages id="forms.mobile-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="codeMeli">
                        <IntlMessages id="forms.codemeli" />
                      </Label>
                      <AvInput
                        name="codeMeli"
                        id="codeMeli"
                        value={this.state.codeMeli}
                        onChange={this.handleChangeCodeMeli}
                        required
                      />
                      <AvFeedback>
                        <IntlMessages id="forms.codemeli-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Button color="primary">
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

export default OwnerForm;
