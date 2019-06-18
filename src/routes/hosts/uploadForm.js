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
import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";

import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

const hostUploader = new FineUploaderTraditional({
  options: {
    chunking: {
      enabled: false
    },
    deleteFile: {
      enabled: true,
      endpoint: "http://192.168.1.5:40679/api/common/Attachment/"
    },
    request: {
      endpoint: "http://192.168.1.5:40679/api/common/Attachment"
    },
    
    callbacks: {
      onComplete: function(id, name, response) {
        if (response.success) {
          console.log("UPLOAD SUCCESS");
        } else {
          console.log("problem uploading stuff");
        }
      }
  }
});
const licenseUploader = new FineUploaderTraditional({
  options: {
    chunking: {
      enabled: false
    },
    deleteFile: {
      enabled: true,
      endpoint: "http://192.168.1.5:40679/api/common/Attachment"
    },
    request: {
      endpoint: "http://192.168.1.5:40679/api/common/Attachment"
    }
  }
});

class UploadForm extends Component {
  render() {
    return (
      <Fragment>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="form-components.upload-hostpic" />
                </CardTitle>
                <Gallery

                  animationsDisabled={true}
                  uploader={hostUploader}
                  deleteButton-children={<span>Delete</span>}
                  fileInput-children={<span />}
                >
                  <span className="react-fine-uploader-gallery-dropzone-content">
                    <IntlMessages id="form-components.drop-files-here" />
                  </span>
                </Gallery>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="form-components.upload-licensepic" />
                </CardTitle>
                <Gallery
                  animationsDisabled={true}
                  uploader={licenseUploader}
                  deleteButton-children={<span>Delete</span>}
                  fileInput-children={<span />}
                >
                  <span className="react-fine-uploader-gallery-dropzone-content">
                    <IntlMessages id="form-components.drop-files-here" />
                  </span>
                </Gallery>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default UploadForm;
