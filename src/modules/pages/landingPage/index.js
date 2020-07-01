import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./landing_page.module.scss";
import { profileListItem } from "Constants/profileConstants";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import heroImage from "Images/delivering-success.svg";
import SellerProposition from "./sellerProposition";
import Benefits from "./benefits";
import FAQ from "./Faq";
import Pricing from "./Pricing";
import HowItWorks from "./HowItWorks";
import DeliveringOrders from "./DeliveringOrders";
import DownloadApp from "./DownloadApp";

import { getPlanListAction } from "Core/modules/subscription/subscriptionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import FullwidthSecondaryHeader from "CommonContainers/fullwidthSecondaryHeader";
import { landingPageHeaderItems } from "Constants/landingPageHeaderConstants";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import HostExhibition from "./hostExhibition";
import translatorHoc from "Hoc/translatorHoc";

class LandingPage extends Component {
  onClickStartSelling = () => {
    const {
      subscriptionReducer: { selectedSubscription },
      navigateTo,
    } = this.props;

    if (selectedSubscription.id) {
      navigateTo("signup");
    } else {
      navigateTo("signup");
    }
  };
  state = {
    activeTab: "benefits",
  };

  handleNavItemClicked = (slug) => {
    this.setState({
      activeTab: slug,
    });
  };

  render() {
    const {
      subscriptionReducer: { subscriptionPlanList },
      getPlanListAction,
      translate,
      isRTL,
    } = this.props;

    {
      map(subscriptionPlanList, (subscription, index) => {
        return (subscription.isSelected = false);
      });
    }

    const { activeTab } = this.state;

    return (
      <FullWidthContainer whiteColor>
        <DivRow fillParent className={styles.hero_section_container}>
          <DivRow
            fillParent
            horizontalCenter
            verticalCenter
            className={` ${styles.hero_section_inner_container} ${
              isRTL ? styles.rtl : ""
            }`}
          >
            <DivColumn fillParent>
              <h1 className={styles.primary_header}>
                {translate("main_home_page.title")}
              </h1>
              <h2 className={styles.secondary_header}>
                {translate("main_home_page.subtitle")}
              </h2>
              <DivRow
                verticalCenter
                horizontalCenter
                className={styles.start_selling_button}
                onClick={this.onClickStartSelling}
              >
                {translate("main_home_page.start_selling")}
              </DivRow>
            </DivColumn>
            <DivColumn fillParent className={styles.app_icon_container}>
              <img
                src={heroImage}
                className={styles.app_icon}
                onClick={this.onClickAppIcon}
              />
            </DivColumn>
          </DivRow>
        </DivRow>
        <FullwidthSecondaryHeader
          navItems={landingPageHeaderItems}
          onClickNavItem={this.handleNavItemClicked}
          selectedTab={activeTab}
        />

        {activeTab == "benefits" ? <Benefits /> : ""}
        {activeTab == "how-it-works" ? <HowItWorks /> : ""}
        {activeTab == "delivering-orders" ? <DeliveringOrders /> : ""}
        {activeTab == "pricing" ? (
          <InitialPageLoader initialPageApi={getPlanListAction}>
            <Pricing subscriptionPlanList={subscriptionPlanList} />
            <DivColumn
              horizontalCenter
              className={styles.pricing_select_container}
            >
              <DivRow
                verticalCenter
                horizontalCenter
                className={styles.start_selling_button_pricing}
                onClick={this.onClickStartSelling}
              >
                {translate("main_home_page.start_selling")}
              </DivRow>
            </DivColumn>

            <HorizontalBorder />
            <HostExhibition />
          </InitialPageLoader>
        ) : (
          ""
        )}
        {activeTab == "faq" ? <FAQ /> : ""}

        <HorizontalBorder />
        <DownloadApp />
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subscriptionReducer: state.subscriptionReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getPlanListAction: bindActionCreators(getPlanListAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(LandingPage)));
