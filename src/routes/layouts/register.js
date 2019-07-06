import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input } from "reactstrap";
import { NavLink } from "react-router-dom";
import Button from "reactstrap-button-loader";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvField
} from "availity-reactstrap-validation";
import {
  mobileValidation,
  passwordValidation,
  confirmPasswordValidation
} from "../../constants/validations";

import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { registerUser } from "Redux/actions";

import registerService from "../../Services/registerService.jsx";
import registerModel from "../../models/registerModel.jsx";
import swal from "sweetalert";

class RegisterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      name: "",
      loading: 0
    };
  }
  /*
  onUserRegister() {
    if (this.state.email !== "" && this.state.password !== "") {
      // this.props.registerUser(this.state, this.props.history);
      this.props.history.push("/");
    }
  }
  */
  async submitRegister(event, value) {
    console.log("event", event);
    console.log("value", value);
    event.preventDefault();
    try {
      this.setState({
        loading: 1
      });
      //let form = new FormData(value);
      let model = new registerModel();
      let service = new registerService();
      //value.forEach((value, key) => (model[key] = value));
      Object.keys(value).map(key => (model[key] = value[key]));

      //model["userName"] = value.userName;
      //model["password"] = value.password;
      //model["confirmPassword"] = value.confirmPassword;
      console.log(model);
      model["roles"] = "کاربر";
      if (model.password !== model.confirmPassword || model.password === "") {
        swal("پیغام", "رمز عبور با تایید رمز عبور برابر نیست", "warning");
        return;
      }
      let response = await service.registerUser(model);
      if (response.status >= 200 && response.status < 300) {
        swal(
          "پیغام",
          "ثبت نام صورت پذیرفت لطفا از صفحه لاگین وارد شوید",
          "success"
        ).then(() => {
          this.props.history.push("login");
        });
      }
    } catch (e) {
      console.log(e);
      swal(
        "پیغام",
        "خطا : ثبت نام انجام نشد" + e.response.data.message,
        "warning"
      );
    } finally {
      this.setState({
        loading: 0
      });
    }
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="white mb-0">
                      برای استفاده از امکانات پرسیس ثبت نام کنید
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.register" />
                    </CardTitle>

                    <AvForm
                      onValidSubmit={async (e, v) =>
                        await this.submitRegister(e, v)
                      }
                    >
                      <Label className="form-group has-float-label mb-4">
                        <AvField
                          name="userName"
                          id="userName"
                          validate={mobileValidation}
                        />
                        <IntlMessages id="forms.mobile" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <AvField
                          name="password"
                          id="password"
                          validate={passwordValidation}
                          type="password"
                        />
                        <IntlMessages
                          id="user.password"
                          defaultValue={this.state.password}
                        />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <AvField
                          name="confirmPassword"
                          id="password"
                          validate={confirmPasswordValidation}
                          type="password"
                        />
                        <IntlMessages id="user.password-confirm" />
                      </Label>
                      <div className="d-flex justify-content-end align-items-center">
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          type="submit"
                          loading={this.state.loading}
                        >
                          <IntlMessages id="user.register-button" />
                        </Button>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/login`}>
                          <IntlMessages id="user.login-title" />
                        </NavLink>
                      </div>
                    </AvForm>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(RegisterLayout);
