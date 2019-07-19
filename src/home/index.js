import React, { Component, Fragment } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import { MenuMultipage, MenuMultipageMobile } from "./menu";
import Home from "./home";
//import HostList from "./../routes/hosts/host-list";
import SearchHostResult from "./hostList";
import hostPage from "./hostPage";
import Footer from "./footer";
import Headroom from "react-headroom";
import scrollToComponent from "react-scroll-to-component";
import { injectIntl } from "react-intl";

import { connect } from "react-redux";
import {
  landingPageMobileMenuToggle,
  landingPageMobileMenuClose
} from "Redux/actions";
const mapStateToProps = ({ landingPage }) => {
  const { isMobileMenuOpen } = landingPage;
  return { isMobileMenuOpen };
};

class LP extends Component {
  constructor(props) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMobileMenuToggle() {
    this.props.landingPageMobileMenuToggle();
  }
  onUnmountingMobileMenu() {
    this.props.landingPageMobileMenuClose();
    return true;
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

  componentDidMount() {
    scrollToComponent(this["home"], { align: "top", duration: 10 });
  }

  render() {
    //const { match, containerClassnames } = this.props;
    //console.log("url", match.url);
    return (
      <Fragment>
        <div
          className={
            this.props.isMobileMenuOpen
              ? "landing-page show-mobile-menu"
              : "landing-page"
          }
        >
          <MenuMultipageMobile
            onUnmountingMenu={() => this.onUnmountingMobileMenu()}
            {...this.props}
          />
          <div className="main-container">
            <Headroom
              className="landing-page-nav"
              ref={x => {
                this.headroom = x;
              }}
            >
              <MenuMultipage
                onMobileMenuToggle={() => this.onMobileMenuToggle()}
                {...this.props}
              />
            </Headroom>

            <div
              className="content-container"
              ref={x => {
                this.home = x;
              }}
            >
              <div className="section root">
                <Switch>
                  <Route path={`/hosts`} component={SearchHostResult} />
                  <Route path={`/hostpage`} component={hostPage} />
                  <Route path={`/`} component={Home} />
                  <Redirect to="/error" />
                </Switch>
              </div>

              <div className="section footer mb-0">
                <Footer onClick={this.onMenuClick} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(
  mapStateToProps,
  { landingPageMobileMenuToggle, landingPageMobileMenuClose }
)(injectIntl(LP));
