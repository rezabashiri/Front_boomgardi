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
        <div className="section home theme-hero-area theme-hero-area-primary">
          <div class="theme-hero-area-bg-wrap">
            <div
              class="theme-hero-area-bg ws-action"
              style={{
                backgroundImage: `url("/assets/img/o14abktz5iy_1500x800.jpg")`
              }}
              data-parallax="true"
            />
            {/* <div class="theme-hero-area-mask theme-hero-area-mask-half" /> */}
            <div class="theme-hero-area-inner-shadow theme-hero-area-inner-shadow-light" />
          </div>
          <div class="theme-hero-area-bg-wrap">
            <div class="_pt-250 _pb-200 _pv-mob-50">
              <Container>
                <div class="theme-search-area-tabs">
                  <div class="theme-search-area-tabs-header _c-w _ta-mob-c">
                    <div className="home-text" />
                    <h1 class="theme-search-area-tabs-title">
                      <IntlMessages id="lp.hero.line-1" />
                    </h1>
                    <p class="theme-search-area-tabs-subtitle">
                      <IntlMessages id="lp.hero.line-2" />
                    </p>
                  </div>
                </div>
                <div className="_pt-20">
                  <div class="theme-search-area theme-search-area-stacked">
                    <div class="theme-search-area-form">
                      <SearchHost viewType="homeSearch" {...this.props} />
                    </div>
                  </div>
                </div>
                <Row>
                  <Colxx xxs="12" className="d-block d-md-none">
                    <img
                      alt="mobile hero"
                      className="mobile-hero"
                      src="/assets/img/landing-page/home-hero-mobile.png"
                    />
                  </Colxx>
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
          </div>
        </div>

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
