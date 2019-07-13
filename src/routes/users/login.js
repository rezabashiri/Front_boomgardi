import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input } from "reactstrap";
import Button from "reactstrap-button-loader";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";

import userService from "../../services/userService.jsx";
import userModel from "../../models/userModel.jsx";
import { getJwt } from "../../helpers/Jwt.js";
import swal from "sweetalert";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvField
} from "availity-reactstrap-validation";
import {
  mobileValidation,
  passwordValidation
} from "../../constants/validations";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: 0
    };
  }
  async onUserLogin(event, value) {
    event.persist();
    this.setState({
      loading: 1
    });
    var srv = new userService();

    var user = new userModel();

    Object.keys(value).map(key => (user[key] = value[key]));

    try {
      await srv.getToken(user);
      if (getJwt() !== null) {
        this.props.onToggleModal();
      }
      //this.props.history.push("app");
      else swal("خطا", "نام کاربری یا رمز عبور معتبر نیست", "warning");
    } catch (e) {
      console.log(e);
      swal("خطا", "نام کاربری یا رمز عبور معتبر نیست", "warning");
    } finally {
      this.setState({
        loading: 0
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Row className="h-100">
          <Colxx xxs="12" md="10" className="mx-auto my-auto">
            <div className="form-side">
              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />
              </CardTitle>
              <AvForm
                onValidSubmit={async (e, v) => await this.onUserLogin(e, v)}
                autoComplete="off"
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
                <div
                  hidden
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <a
                      onClick={() =>
                        this.props.onChangeView &&
                        this.props.onChangeView("forgot")
                      }
                    >
                      {" "}
                      <IntlMessages id="user.forgot-password-question" />
                    </a>
                  </div>

                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    type="submit"
                    loading={this.state.loading}
                  >
                    <IntlMessages id="user.login-button" />
                  </Button>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <a
                    onClick={() =>
                      this.props.onChangeView &&
                      this.props.onChangeView("register")
                    }
                  >
                    {" "}
                    <IntlMessages id="user.register" />
                  </a>
                </div>
              </AvForm>
            </div>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
