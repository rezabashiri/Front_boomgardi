import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import { NavLink } from "react-router-dom";
import SearchHost from "./searchHost";
import PersisServices from "./persisServices";
import scrollToComponent from "react-scroll-to-component";

class Home extends Component {
  constructor(props) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }
  onMenuClick(ref, event) {
    event.preventDefault();
    let scroller;
    if (ref !== "home") {
      scroller = scrollToComponent(this[ref], { align: "top", offset: 60 });
      scroller.on("end", () => {
        this.headroom.unpin();
        this.props.landingPageMobileMenuClose();
      });
    } else {
      scrollToComponent(this[ref], { align: "top" });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="section home">
          <Container>
            <Row>
              <Colxx xxs="12" className="d-block d-md-none">
                <img
                  alt="mobile hero"
                  className="mobile-hero"
                  src="/assets/img/landing-page/home-hero-mobile.png"
                />
              </Colxx>

              <div className="home-text">
                <div className="display-1">
                  <IntlMessages id="lp.hero.line-1" />
                  <br />
                  <br />
                  <IntlMessages id="lp.hero.line-2" />
                </div>
              </div>
            </Row>
            <Row>
              <NavLink
                id="homeCircleButton"
                className="btn btn-circle btn-outline-semi-light hero-circle-button"
                to="#"
                onClick={event => this.onMenuClick("features", event)}
              >
                <i className="simple-icon-arrow-down" />
              </NavLink>
            </Row>
          </Container>
        </div>

        <SearchHost viewType="homeSearch" {...this.props} />

        <div
          className="section"
          ref={x => {
            this.features = x;
          }}
        >
          <Container>
            <PersisServices />
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default Home;
