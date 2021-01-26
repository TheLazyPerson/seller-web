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
import isEmpty from "lodash/isEmpty";
import { formatUnixTimeStampToDateTime } from "Utils/formatHelper";
import {
  getActivePlan,
  getSubscriptionListAction,
  activatePlanAction,
} from "Core/modules/subscription/subscriptionActions";
import ChangePlanModal from "./changePlanModal";
class ExhibitionSubscriptionOverviewPage extends Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    const {
      getActivePlan,
      getSubscriptionListAction
    } = this.props;
    getActivePlan();
    getSubscriptionListAction();
  }

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

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };

  onClickChangePlan = (id) => {
    const {
      activatePlanAction,
      match: { params },
      getExhibitionSubscriptionOverview
    } = this.props;

    activatePlanAction(id).then(function ({ payload }) {
      if (payload.code === 200 || payload.code === 201) {
        showSuccessFlashMessage("Plan Activated");
        getExhibitionSubscriptionOverview(params.exhibitionId);

      }
    });

    this.setState({
      showModal: false,
    });
  };

  render() {
    const {
      exhibitionReducer: { subscriptionOverview, selectedSubscriptionOption },
      match: { params },
      getExhibitionSubscriptionOverview,
      translate,
      isRTL,
      subscriptionReducer: { activeSubscription, sellerSubscriptionList },
      languageReducer: { languageCode },
    } = this.props;
    const { showModal } = this.state;

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
              title={
                !isEmpty(subscriptionOverview) &&
                subscriptionOverview.translations[languageCode].title
              }
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
                    {!isEmpty(subscriptionOverview) &&
                      subscriptionOverview.translations[languageCode].title}
                  </div>
                </DivColumn>
              </DivRow>
              <DivRow className={styles.text_wrapper}>
                <DivColumn>
                  <div className={styles.title}>
                    {translate("exhibition_overview.description")} :
                  </div>
                  <div className={styles.description}>
                    {!isEmpty(subscriptionOverview) &&
                      subscriptionOverview.translations[languageCode]
                        .short_description}
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
                    {formatUnixTimeStampToDateTime(
                      subscriptionOverview.start_date
                    )}
                  </div>
                  <div className={styles.description}>
                    <span className={styles.title}>
                      {translate("exhibition_overview.ends_on")}:
                    </span>{" "}
                    {formatUnixTimeStampToDateTime(
                      subscriptionOverview.end_date
                    )}
                  </div>
                </DivColumn>
              </DivRow>
            </div>
            <HorizontalBorder />

            <NavHeader title="Subscription Information"></NavHeader>
            
              <div className={styles.overview_container}>
                <DivRow className={styles.text_wrapper}>
                  <DivColumn>
                    <div className={styles.title}>
                      {translate("subscription_item.active_plan")}:
                    </div>
                    <div className={styles.description}>
                      {!isEmpty(activeSubscription.plan) &&
                        activeSubscription.plan.translations[languageCode]
                          .plan_name}
                      &nbsp;&nbsp;&nbsp;
                      <button
                        className={styles.change_plan_button}
                        onClick={() => this.onOpenModal()}
                      >
                        {translate("subscription_item.change_plan")}
                      </button>
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
         
            <ChangePlanModal
              open={showModal}
              onClose={this.onCloseModal}
              onClickChangePlan={this.onClickChangePlan}
              sellerSubscriptionList={sellerSubscriptionList}
              activeSubscription={activeSubscription}
            />
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
    languageReducer: state.languageReducer,
    subscriptionReducer: state.subscriptionReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getExhibitionSubscriptionOverview: bindActionCreators(
      getExhibitionSubscriptionOverview,
      dispatch
    ),
    getActivePlan: bindActionCreators(getActivePlan, dispatch),
    getSubscriptionListAction: bindActionCreators(
      getSubscriptionListAction,
      dispatch
    ),
    subscribeToExhibition: bindActionCreators(subscribeToExhibition, dispatch),

    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
    logoutAction: bindActionCreators(logoutAction, dispatch),
    activatePlanAction: bindActionCreators(activatePlanAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(ExhibitionSubscriptionOverviewPage)));
