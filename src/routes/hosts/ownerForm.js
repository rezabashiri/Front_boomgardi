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

class OwnerForm extends Component {
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

                <AvForm className="mb-5 row">
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

                      <AvInput name="lastName" id="lastName" required />
                      <AvFeedback>
                        <IntlMessages id="forms.lastname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleCity">
                        <IntlMessages id="forms.mobile" />
                      </Label>
                      <AvInput name="rank" id="avexampleMobile" required />
                      <AvFeedback>
                        <IntlMessages id="forms.mobile-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="codemeli">
                        <IntlMessages id="forms.codemeli" />
                      </Label>
                      <AvInput name="codemeli" id="codemeli" required />
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
