import React, { Component, Fragment } from "react";
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import { serverConfig } from "../../constants/defaultValues";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";
//import Thumbnail from "react-fine-uploader/thumbnail";

//import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

class UploadForm extends Component {
  hostUploader = new FineUploaderTraditional({
    options: {
      chunking: {
        enabled: false
      },
      deleteFile: {
        enabled: true,
        endpoint: serverConfig.baseUrl + serverConfig.picUrl,
        params: { attachId: this.props.attachId }
      },
      request: {
        endpoint: serverConfig.baseUrl + serverConfig.picUrl,
        params: {
          attachId: this.props.attachId,
          attachType: { part: "host", type: "profile" }
        }
      },
      validation: {
        allowedExtensions: ["jpg", "jpeg", "png", "gif", "bmp"],
        allowEmpty: false,
        sizeLimit: 20971520,
        stopOnFirstInvalidFile: true
      }
    }
  });
  licenseUploader = new FineUploaderTraditional({
    options: {
      chunking: {
        enabled: false
      },
      deleteFile: {
        enabled: true,
        endpoint: serverConfig.baseUrl + serverConfig.picUrl
      },
      request: {
        endpoint: serverConfig.baseUrl + serverConfig.picUrl,
        params: {
          attachId: this.props.attachId,
          attachType: { part: "host", type: "license" }
        }
      }
    }
  });

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
                  uploader={this.hostUploader}
                  deleteButton-children={<span>حذف</span>}
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
                  uploader={this.licenseUploader}
                  deleteButton-children={<span>حذف</span>}
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
