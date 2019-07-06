import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input } from "reactstrap";
import Button from "reactstrap-button-loader";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { loginUser } from "Redux/actions";

import userService from "../../services/userService.jsx";
import userModel from "../../models/userModel.jsx";
import { getJwt } from "../../helpers/Jwt.js";
import swal from "sweetalert";

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: 0
    };
  }
  /*
  onUserLogin() {
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.loginUser(this.state, this.props.history);
    }
  }
  */

  async onUserLogin(event) {
    event.preventDefault();
    this.setState({
      loading: 1
    });
    var srv = new userService();

    var user = new userModel();
    const data = new FormData(event.target);
    data.forEach((value, key) => {
      user[key] = value;
    });

    try {
      await srv.getToken(user);
      if (getJwt() !== null) this.props.history.push("app");
    } catch (e) {
      console.log(e);
      swal("خطا", "نام کاربری یا رمز عبور معتبر نیست", "warning");
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
                      برای استفاده از امکانات پرسیس وارد شوید
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.login-title" />
                    </CardTitle>
                    <Form onSubmit={e => this.onUserLogin(e)}>
                      <Label className="form-group has-float-label mb-4">
                        <Input name="userName" />
                        <IntlMessages id="forms.mobile" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input name="password" type="password" />
                        <IntlMessages
                          id="user.password"
                          defaultValue={this.state.password}
                        />
                      </Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/forgot-password`}>
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
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
                        <NavLink to={`/register`}>
                          <IntlMessages id="user.register" />
                        </NavLink>
                      </div>
                    </Form>
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
    loginUser
  }
)(LoginLayout);
