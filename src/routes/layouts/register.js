import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

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
      email: "demo@gogo.com",
      password: "gogo123",
      name: "Sarah Kortney"
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
  async submitRegister(event) {
    event.preventDefault();
    try
    {
    let form = new FormData(event.target);
    let model = new registerModel();
    let service = new registerService();
    form.forEach((value, key) => (model[key] = value));
    model["roles"] = "کاربر";
    if (model.password !== model.confirmPassword || model.password === '') {
      swal("پیغام", "رمز عبور با تایید رمز عبور برابر نیست", "warning");
      return;
    }
    let response = await service.registerUser(model);
    if (response.status >= 200 && response.status < 300 ) {
      swal(
        "پیغام",
        "ثبت نام صورت پذیرفت لطفا از صفحه لاگین وارد شوید",
        "success"
      ).then( () =>{
        this.props.history.push("login");
      }
      );
    }
 
    }
    catch(e)
    {
      console.log(e);

      swal(
        "پیغام",
        "خطا : ثبت نام انجام نشد" + e.response.data.message,
        "warning"
      );
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
                    <Form onSubmit={e => this.submitRegister(e)}>
                      <Label className="form-group has-float-label mb-4">
                        <Input name="userName" />
                        <IntlMessages id="forms.mobile" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="password" name="password" />
                        <IntlMessages
                          id="user.password"
                          defaultValue={this.state.password}
                        />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="password" name="confirmPassword"  />
                        <IntlMessages id="user.password-confirm" />
                      </Label>
                      <div className="d-flex justify-content-end align-items-center">
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          type="submit"
                        >
                          <IntlMessages id="user.register-button" />
                        </Button>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/login`}>
                          <IntlMessages id="user.login-title" />
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
    registerUser
  }
)(RegisterLayout);
