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
import Subscription from "CommonComponents/subscriptionComponent";
import HorizontalBorder from "CommonComponents/horizontalBorder";

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
            <DivColumn className={styles.inner_content_container}>
              <InitialPageLoader initialPageApi={getActivePlan}>
                <ActiveSubscription
                  subscription={activeSubscription}
                  isSelected={false}
                />
              </InitialPageLoader>

              <DivColumn fillParent className={styles.additional_plans}>
                <DivColumn className={styles.additional_plans_title}>
                  Add Additional Plans:
                </DivColumn>
                <DivColumn className={styles.additional_plans_container}>
                  <InitialPageLoader initialPageApi={getPlanListAction}>
                    <DivRow>
                      {map(subscriptionPlanList, (subscription, index) => {
                        if (
                          activeSubscription.id !== subscription.id &&
                          subscription.price !== 0
                        ) {
                          return (
                            <Subscription
                              subscription={subscription}
                              features={subscription.features}
                            />
                          );
                        }
                      })}
                    </DivRow>
                  </InitialPageLoader>
                </DivColumn>
              </DivColumn>
            </DivColumn>
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
