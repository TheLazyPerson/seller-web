import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./subscription.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import {
  getPlanListAction,
  getActivePlan,
} from "Core/modules/subscription/subscriptionActions";
import Pricing from "../landingPage/Pricing";
import ActiveSubscription from "CommonComponents/activeSubscriptionComponent";

class SubscriptionPage extends Component {
  render() {
    const {
      translate,
      subscriptionReducer: { subscriptionPlanList, activeSubscription },
      getPlanListAction,
      getActivePlan,
    } = this.props;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.subscription_page_container}>
          <NavHeader title="Subscription Details"></NavHeader>

          <DivColumn fillParent className={styles.content_container}>
            <DivRow className={styles.inner_content_container}>
              <InitialPageLoader initialPageApi={getActivePlan}>
                <ActiveSubscription
                  subscription={activeSubscription}
                  isSelected={false}
                />
              </InitialPageLoader>
              {/* <InitialPageLoader initialPageApi={getPlanListAction}>
                {map(subscriptionPlanList, (subscription, index) => {
                  return (
                    <Subscription
                      subscription={subscription}
                      features={subscription.features}
                      isSelected={
                        subscription.id == activeSubscription.id ? true : false
                      }
                    />
                  );
                })}
            </InitialPageLoader> */}
            </DivRow>
          </DivColumn>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subscriptionReducer: state.subscriptionReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getPlanListAction: bindActionCreators(getPlanListAction, dispatch),
    getActivePlan: bindActionCreators(getActivePlan, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(SubscriptionPage));
