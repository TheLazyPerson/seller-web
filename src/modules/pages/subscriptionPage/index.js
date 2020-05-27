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
  getSubscriptionListAction,
  buyAdditionalPlanAction,
} from "Core/modules/subscription/subscriptionActions";
import Pricing from "../landingPage/Pricing";
import ActiveSubscription from "CommonComponents/activeSubscriptionComponent";
import Subscription from "CommonComponents/subscriptionComponent";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import SubscribedComponent from "CommonComponents/subscribedComponent";
import DataTableContainer from "CommonContainers/dataTableContainer";
import DataTable from "react-data-table-component";
import Button from "@material-ui/core/Button";
import memoize from "memoize-one";
import BuyPlanModal from "./buyAddtionalPlanModal";

class SubscriptionPage extends Component {
  state = {
    showModal: false,
  };

  columns = memoize(() => [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "PLAN NAME",
      selector: "name",
      sortable: true,
      grow: 2,
    },
    {
      name: "PLAN DESCRIPTION",
      selector: "description",
      sortable: true,
      grow: 2,
    },
    {
      name: "NO OF PRODUCTS",
      selector: "plan.no_of_products",
      sortable: true,
    },
    {
      name: "NO OF EXHIBITIONS",
      selector: "plan.no_of_exhibitions",
      sortable: true,
    },
    {
      cell: (value) => (
        <Button
          variant="contained"
          color="primary"
          className={styles.custom_button}
          onClick={() => {
            const { navigateTo } = this.props;
            // navigateTo("product-details", { productId: value.id });
          }}
        >
          Activate
        </Button>
      ),
      button: true,
    },
  ]);

  onClickBuyPlan = (planId) => {
    const { buyAdditionalPlanAction } = this.props;
    buyAdditionalPlanAction(planId).then(({ payload }) => {
      if (payload.code == 200 || payload.code == 201) {
        const {
          data: { payment_information },
        } = payload;

        window.location.href = payment_information.paymentURL;
      }
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onClickBuyAdditionalPlan = () => {
    this.setState({
      showModal: true,
    });
  };

  render() {
    const {
      translate,
      subscriptionReducer: {
        subscriptionPlanList,
        activeSubscription,
        sellerSubscriptionList,
      },
      getPlanListAction,
      getActivePlan,
      getSubscriptionListAction,
    } = this.props;
    const { showModal } = this.state;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.subscription_page_container}>
          <NavHeader title="Subscription Details">
            <CapsuleButton onClick={() => this.onClickBuyAdditionalPlan()}>
              BUY ADDITIONAL PLAN
            </CapsuleButton>
          </NavHeader>

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
                  Subscribed Plans:
                </DivColumn>
                <DivColumn
                  fillParent
                  className={styles.additional_plans_container}
                >
                  <InitialPageLoader initialPageApi={getSubscriptionListAction}>
                    <DivRow>
                      <DataTableContainer
                        data={sellerSubscriptionList}
                        title="SubscriptionLost"
                        columns={this.columns()}
                      />
                      {/* {map(sellerSubscriptionList, (subscription, index) => {
                        if (activeSubscription.id !== subscription.id) {
                          return (
                            <SubscribedComponent
                              subscription={subscription}
                              features={subscription.features}
                            />
                          );
                        }
                      })} */}
                    </DivRow>
                  </InitialPageLoader>
                </DivColumn>
              </DivColumn>

              {/* <DivColumn fillParent className={styles.additional_plans}>
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
              </DivColumn> */}

              <InitialPageLoader initialPageApi={getPlanListAction}>
                <BuyPlanModal
                  open={showModal}
                  onClose={this.onCloseModal}
                  onClickBuyPlan={this.onClickBuyPlan}
                  planList={subscriptionPlanList}
                  activeSubscription={activeSubscription}
                />
              </InitialPageLoader>
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
    getSubscriptionListAction: bindActionCreators(
      getSubscriptionListAction,
      dispatch
    ),
    buyAdditionalPlanAction: bindActionCreators(
      buyAdditionalPlanAction,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(SubscriptionPage));
