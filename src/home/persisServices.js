import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";

export default class PersisServices extends React.Component {
  render() {
    return (
      <Row>
        <Colxx xxs="12" className="pl-0 pr-0 mb-5 home-carousel">
          <ReactSiemaCarousel
            perPage={{
              0: 1,
              768: 2,
              1200: 3,
              1440: 4
            }}
            controls={false}
            loop={false}
            rtl={true}
          >
            <div className="pr-3 pl-3">
              <Card>
                <CardBody className="text-center">
                  <div>
                    <i className="iconsmind-Bus large-icon" />
                    <h5 className="mb-0 font-weight-semibold">
                      <IntlMessages id="menu.tours" />
                    </h5>
                  </div>
                  <div>
                    <p className="detail-text">
                      <IntlMessages id="lp.featurecarousel.detail-2" />
                    </p>
                  </div>
                  <NavLink className="btn btn-link font-weight-semibold" to="/">
                    <IntlMessages id="lp.featurecarousel.view" />
                  </NavLink>
                </CardBody>
              </Card>
            </div>
            <div className="pr-3 pl-3">
              <Card>
                <CardBody className="text-center">
                  <div>
                    <i className="simple-icon-plane large-icon" />
                    <h5 className="mb-0 font-weight-semibold">
                      <IntlMessages id="menu.company" />
                    </h5>
                  </div>
                  <div>
                    <p className="detail-text">
                      <IntlMessages id="lp.featurecarousel.detail-3" />
                    </p>
                  </div>
                  <NavLink className="btn btn-link font-weight-semibold" to="/">
                    <IntlMessages id="lp.featurecarousel.view" />
                  </NavLink>
                </CardBody>
              </Card>
            </div>

            <div className="pr-3 pl-3">
              <Card>
                <CardBody className="text-center">
                  <div>
                    <i className="iconsmind-Jeep-2 large-icon" />
                    <h5 className="mb-0 font-weight-semibold">
                      <IntlMessages id="menu.leaders" />
                    </h5>
                  </div>
                  <div>
                    <p className="detail-text">
                      <IntlMessages id="lp.featurecarousel.detail-4" />
                    </p>
                  </div>
                  <NavLink className="btn btn-link font-weight-semibold" to="/">
                    <IntlMessages id="lp.featurecarousel.view" />
                  </NavLink>
                </CardBody>
              </Card>
            </div>
            <div className="pr-3 pl-3">
              <Card>
                <CardBody className="text-center">
                  <div>
                    <i className="iconsmind-Home-5 large-icon" />
                    <h5 className="mb-0 font-weight-semibold">
                      <IntlMessages id="menu.hosts" />
                    </h5>
                  </div>
                  <div>
                    <p className="detail-text">
                      <IntlMessages id="lp.featurecarousel.detail-1" />
                    </p>
                  </div>
                  <NavLink
                    className="btn btn-link font-weight-semibold"
                    to="/hosts"
                  >
                    <IntlMessages id="lp.featurecarousel.view" />
                  </NavLink>
                </CardBody>
              </Card>
            </div>
          </ReactSiemaCarousel>
        </Colxx>
      </Row>
    );
  }
}
