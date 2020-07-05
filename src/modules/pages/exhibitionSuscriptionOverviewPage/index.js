import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./exhibition_subscription_details.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getExhibitionSubscriptionOverview,
  subscribeToExhibition,
} from "Core/modules/exhibition/exhibitionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import SubscriptionOption from "CommonComponents/subscriptionOptionComponent";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import translatorHoc from "Hoc/translatorHoc";

class ExhibitionSubscriptionOverviewPage extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };
  onClickEnroll = (exhibitionId, subscriptionOption) => {
    const {
      subscribeToExhibition,
      showSuccessFlashMessage,
      navigateTo,
    } = this.props;
    subscribeToExhibition(exhibitionId, {
      type: subscriptionOption.type,
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        navigateTo("your-exhibitions");
        showSuccessFlashMessage("Subscribed to exhibition successfuly");
      } else {
        showSuccessFlashMessage(payload.message);
      }
    });
  };
  render() {
    const {
      exhibitionReducer: { subscriptionOverview, selectedSubscriptionOption },
      match: { params },
      getExhibitionSubscriptionOverview,
      translate,
      isRTL,
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn
          fillParent
          className={` ${styles.exhibition_subscription_page_container} ${
            isRTL ? styles.rtl : ""
          }`}
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
            <NavHeader
              title={translate("exhibition_overview.overview")}
            ></NavHeader>
            <div className={styles.overview_container}>
              <DivRow className={styles.text_wrapper}>
                <DivColumn>
                  <div className={styles.title}>
                    {translate("exhibition_overview.name")}:
                  </div>
                  <div className={styles.description}>
                    {subscriptionOverview.title}
                  </div>
                </DivColumn>
              </DivRow>
              <DivRow className={styles.text_wrapper}>
                <DivColumn>
                  <div className={styles.title}>
                    {translate("exhibition_overview.description")} :
                  </div>
                  <div className={styles.description}>
                    {subscriptionOverview.short_description}
                  </div>
                </DivColumn>
              </DivRow>
              <DivRow className={styles.text_wrapper}>
                <DivColumn>
                  <div className={styles.title}>
                    {" "}
                    {translate("exhibition_overview.dates")}:
                  </div>
                  <div className={styles.description}>
                    <span className={styles.title}>
                      {translate("exhibition_overview.starts_at")}:
                    </span>{" "}
                    {subscriptionOverview.start_date}
                  </div>
                  <div className={styles.description}>
                    <span className={styles.title}>
                      {translate("exhibition_overview.ends_on")}:
                    </span>{" "}
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
              {map(subscriptionOverview.subscription_options, (option) => {
                return <SubscriptionOption option={option} />;
              })}
            </DivRow>
            <DivRow className={styles.options_wrapper}>
              <CapsuleButton
                onClick={() =>
                  this.onClickEnroll(
                    params.exhibitionId,
                    selectedSubscriptionOption
                  )
                }
                className={styles.enroll_button}
              >
                {translate("exhibition_overview.enroll")}
              </CapsuleButton>
            </DivRow>
          </InitialPageLoader>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exhibitionReducer: state.exhibitionReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getExhibitionSubscriptionOverview: bindActionCreators(
      getExhibitionSubscriptionOverview,
      dispatch
    ),
    subscribeToExhibition: bindActionCreators(subscribeToExhibition, dispatch),

    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
    logoutAction: bindActionCreators(logoutAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(ExhibitionSubscriptionOverviewPage)));
