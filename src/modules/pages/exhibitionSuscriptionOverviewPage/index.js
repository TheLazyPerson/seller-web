import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./exhibition_subscription_details.module.scss";
import { profileListItem } from "Constants/profileConstants";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import { getExhibitionSubscriptionOverview } from "Core/modules/exhibition/exhibitionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import SubscriptionOption from "CommonComponents/subscriptionOptionComponent";

class ExhibitionSubscriptionOverviewPage extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  renderSubscriptionOptions(subscriptionType, subscriptionOptions) {
    switch (subscriptionType) {
      case "both":
        return map(subscriptionOptions, option => {
          return <SubscriptionOption option={option} />;
        });
      case "flat_fee":
        return "bar";
      case "commission":
        return "fas";
      default:
        return "foo";
    }
  }
  render() {
    const {
      exhibitionReducer: { subscriptionOverview },
      match: { params },
      getExhibitionSubscriptionOverview
    } = this.props;
    const subscriptionTypes = ["both", "flat_fee", "commision"];

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn
          fillParent
          className={styles.exhibition_subscription_page_container}
        >
          <InitialPageLoader
            initialPageApi={() =>
              getExhibitionSubscriptionOverview(params.exhibitionId)
            }
          >
            <NavHeader
              title={subscriptionOverview.title}
              onBackClick={this.onBackPress}
            ></NavHeader>
            <NavHeader title="Overview"></NavHeader>
            <div className={styles.overview_container}>
              <DivRow className={styles.text_wrapper}>
                <DivColumn>
                  <div className={styles.title}>NAME:</div>
                  <div className={styles.description}>
                    {subscriptionOverview.title}
                  </div>
                </DivColumn>
              </DivRow>
              <DivRow className={styles.text_wrapper}>
                <DivColumn>
                  <div className={styles.title}>SHORT DESCRIPTION:</div>
                  <div className={styles.description}>
                    {subscriptionOverview.short_description}
                  </div>
                </DivColumn>
              </DivRow>
              <DivRow className={styles.text_wrapper}>
                <DivColumn>
                  <div className={styles.title}>DATES:</div>
                  <div className={styles.description}>
                    <span className={styles.title}>STARTS AT:</span>{" "}
                    {subscriptionOverview.start_date}
                  </div>
                  <div className={styles.description}>
                    <span className={styles.title}>ENDS ON:</span>{" "}
                    {subscriptionOverview.end_date}
                  </div>
                </DivColumn>
              </DivRow>
            </div>
            <HorizontalBorder />
            <DivRow className={styles.text_wrapper}>
              <DivColumn>
                <div className={styles.description}>
                  {subscriptionOverview.terms}
                </div>
              </DivColumn>
            </DivRow>
            <DivRow className={styles.options_wrapper}>
              {map(subscriptionOverview.subscription_options, option => {
                return <SubscriptionOption option={option} />;
              })}
            </DivRow>
            <DivRow className={styles.options_wrapper}>
              <CapsuleButton className={styles.enroll_button}>
                ENROLL
              </CapsuleButton>
            </DivRow>
          </InitialPageLoader>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    exhibitionReducer: state.exhibitionReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    getExhibitionSubscriptionOverview: bindActionCreators(
      getExhibitionSubscriptionOverview,
      dispatch
    ),
    logoutAction: bindActionCreators(logoutAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(ExhibitionSubscriptionOverviewPage));