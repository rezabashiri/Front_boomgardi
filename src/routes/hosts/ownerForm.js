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
import registerService from "../../services/registerService.jsx";
import {
  mobileValidation,
  codeMeliValidation,
  nameValidation
} from "../../constants/validations";

class OwnerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      mobile: null,
      codeMeli: null,
      loading: 0
    };
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeCodeMeli = this.handleChangeCodeMeli.bind(this);
    this.onOwnerSave = this.onOwnerSave.bind(this);
  }
  async onOwnerSave(event) {
    this.setState({
      loading: 1
    });
    event.preventDefault();
    //let form = new FormData(event.target);
    let model = new userModel();
    let usrService = new userService();
    //form.forEach((value, key) => (model[key] = value));
    model["roles"] = "اقامتگاه";
    model["firstName"] = this.state.firstName;
    model["lastName"] = this.state.lastName;
    model["userName"] = this.state.mobile;
    model["password"] = this.state.codeMeli;
    model["nationalCode"] = this.state.codeMeli;
    let result = await usrService.addUser(model);
    console.log("result",result);
    if (result.status === 201) {
      this.setState({
        loading: 0
      });
      this.props.onHandleComplete && this.props.onHandleComplete();
      this.props.onHandleOwnerUserId &&
        this.props.onHandleOwnerUserId(result.data.id);
      this.props.onToggleModal && this.props.onToggleModal();
      this.props.getHost && this.props.getHost();
      console.log("here we are already");
    }
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

  async componentDidMount() {
    if (this.props.ownerId) {
      let srv = new userService();
      let user = await srv.getUsers("?id=" + this.props.ownerId);
      this.setState({
        firstName: user[0].firstName,
        mobile: user[0].userName,
        lastName: user[0].lastName,
        codeMeli: user[0].nationalCode
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
                  <IntlMessages id="menu.add-hostowner" />
                </CardTitle>

                <AvForm className="mb-5 row" onValidSubmit={this.onOwnerSave}>
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="firstName">
                        <IntlMessages id="forms.firstname" />
                      </Label>
                      <AvField
                        className="form-control"
                        name="firstName"
                        id="firstName"
                        validate={nameValidation}
                        value={this.state.firstName}
                        onChange={this.handleChangeFirstName}
                      />
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="lastName">
                        <IntlMessages id="forms.lastname" />
                      </Label>
                      <AvField
                        name="lastName"
                        id="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChangeLastName}
                        validate={nameValidation}
                      />
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="mobile">
                        <IntlMessages id="forms.mobile" />
                      </Label>
                      <AvField
                        name="mobile"
                        id="mobile"
                        value={this.state.mobile}
                        validate={mobileValidation}
                        onChange={this.handleChangeMobile}
                        placeholder="به عنوان نام کاربری"
                      />
                    </AvGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="codeMeli">
                        <IntlMessages id="forms.codemeli" />
                      </Label>
                      <AvField
                        name="codeMeli"
                        id="codeMeli"
                        value={this.state.codeMeli}
                        onChange={this.handleChangeCodeMeli}
                        validate={codeMeliValidation}
                        placeholder="به عنوان رمز عبور"
                      />
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Button
                        color="primary"
                        className="btn-shadow"
                        size="lg"
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

export default OwnerForm;
