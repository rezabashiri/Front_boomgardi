import React, { Component, Fragment } from "react";
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import { serverConfig } from "../../constants/defaultValues";
import { Row, Card, CardBody, CardTitle, Button } from "reactstrap";
import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";
//import Thumbnail from "react-fine-uploader/thumbnail";

//import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

class RoomUploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachId: this.props.attachId
    };
  }
  roomUploader = new FineUploaderTraditional({
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
          attachType: { part: "residancyUnit", type: "profile" }
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
  galleryUploader = new FineUploaderTraditional({
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
          attachType: { part: "residancyUnit", type: "gallery" }
        }
      }
    }
  });

  getRoomUploader() {
    this.roomUploader.options.request.params.attachId = this.props.attachId;
    this.roomUploader.options.deleteFile.params.attachId = this.props.attachId;
    console.log(this.roomUploader);
    return this.roomUploader;
  }
  getGalleryUploader() {
    this.galleryUploader.options.request.params.attachId = this.props.attachId;
    this.galleryUploader.options.deleteFile.params.attachId = this.props.attachId;
    return this.galleryUploader;
  }
  uploadCompleted() {
    //this.props.onGetRooms && (await this.props.onGetRooms());
    this.props.onHandleComplete && this.props.onHandleComplete();
    this.props.onToggleModal && this.props.onToggleModal();
  }

  render() {
    /*
    this.roomUploader.options.request.params = {
      attachId: this.props.attachId,
      attachType: { part: "residancyUnit", type: "profile" }
    };*/

    return (
      <Fragment>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="form-components.upload-roompic" />
                </CardTitle>
                <Gallery
                  animationsDisabled={true}
                  uploader={this.getRoomUploader()}
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
                  <IntlMessages id="form-components.upload-roomgallery" />
                </CardTitle>
                <Gallery
                  animationsDisabled={true}
                  uploader={this.getGalleryUploader()}
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
          <Button onClick={() => this.uploadCompleted()} color="primary">
            <IntlMessages id="layouts.submit" />
          </Button>
        </Row>
      </Fragment>
    );
  }
}
export default RoomUploadForm;
