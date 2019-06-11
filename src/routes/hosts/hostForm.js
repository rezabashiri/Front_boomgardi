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

const selectData = [
  { label: "تهران", value: "tehran", key: 0 },
  { label: "اصفهان", value: "isfahan", key: 1 },
  { label: "شیراز", value: "shiraz", key: 2 }
];

class HostForm extends Component {
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
                        <Label className="av-label" for="hostCity">
                          <IntlMessages id="forms.city" />
                        </Label>
                        <AvInput
                          type="password"
                          name="hostCity"
                          id="hostCity"
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hostcity-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>

                    <Colxx sm={12}>
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
                        <Select options={selectData} />
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
      </Fragment>
    );
  }
}

export default HostForm;
