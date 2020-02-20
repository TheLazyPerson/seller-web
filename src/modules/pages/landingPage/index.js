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
import { getPlanListAction } from "Core/modules/subscription/subscriptionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import FullwidthSecondaryHeader from "CommonContainers/fullwidthSecondaryHeader";
import { landingPageHeaderItems } from "Constants/landingPageHeaderConstants";

class LandingPage extends Component {
  onClickStartSelling = () => {
    const {
      subscriptionReducer: { selectedSubscription },
      navigateTo
    } = this.props;

    if (selectedSubscription.id) {
      navigateTo("signup");
    }
  };
  state = {
    activeTab: "benefits"
  };

  handleNavItemClicked = slug => {
    this.setState({
      activeTab: slug
    });
  };

  render() {
    const {
      subscriptionReducer: { subscriptionPlanList },
      getPlanListAction
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
          <DivRow fillParent horizontalCenter verticalCenter>
            <DivColumn fillParent>
              <h1 className={styles.primary_header}>
                Sell your products to customers across Kuwait
              </h1>
              <h2 className={styles.secondary_header}>
                Shake hand with the most reputed company known for hosting
                exhibitions. We reached around all the corners of Kuwait.
              </h2>
              <DivRow
                verticalCenter
                horizontalCenter
                className={styles.start_selling_button}
                onClick={this.onClickStartSelling}
              >
                Start Selling
              </DivRow>
            </DivColumn>
            <DivColumn fillParent>
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
        {activeTab == "faq" ? <FAQ /> : ""}
        {activeTab == "pricing" ? (
          <InitialPageLoader initialPageApi={getPlanListAction}>
            <Pricing subscriptionPlanList={subscriptionPlanList} />
          </InitialPageLoader>
        ) : (
          ""
        )}
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriptionReducer: state.subscriptionReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    getPlanListAction: bindActionCreators(getPlanListAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(LandingPage));
